"use strict";

const Http = require('http');
const Https = require('https');
const EventEmitter = require('events').EventEmitter;
const Querystring = require('querystring');
const Util = require('util');
const Crypto = require('crypto');
const fs = require('fs');
const BufferObj = require('./bufferObj.js');

function reply(statusCode, res) {
  var message = { message: Http.STATUS_CODES[statusCode].toLowerCase() };
  message.result = statusCode >= 400 ? 'error' : 'ok';
  message = JSON.stringify(message);

  var headers = {
    'Content-Type': 'application/json',
    'Content-Length': message.length
  };

  res.writeHead(statusCode, headers);
  res.end(message);
}

function serverHandler(req, res) {
  var self = this;
  var buffer_obj = BufferObj();

  req.on('err', (err) => {
    self.logger.error(err);
  });

  req.on('data', (chunk) => {
    buffer_obj.load(chunk);
  });

  req.on('end', (chunk) => {
    // Only accept data through POST methods.
    if (req.method !== 'POST') {
      self.logger.error(Util.format('got invalid method, returning 405'));
      // failed = true;
      reply(405, res);
    }

    if (chunk) {
      buffer_obj.load(chunk);
    }

    /* Capture headers and payload */
    // console.log(req.headers);
    // fs.writeFile('travis-headers', JSON.stringify(req.headers), function(err){
    //   if (err) {
    //     return console.log(err);
    //   }
    //
    //   console.log("The file was saved!");
    // });
    // fs.writeFile('travis-payload', buffer_obj.contents, function(err){
    //   if (err) {
    //     return console.log(err);
    //   }
    //
    //   console.log("The file was saved!");
    // });

    self.logger.log(Util.format('received %d bytes', buffer_obj.buffer_length));

    buffer_obj.concat_toString();

    var parsed_data = Querystring.parse(buffer_obj.data).payload;
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      parsed_data = decodeURI(parsed_data);
    }
    parsed_data = JSON.parse(parsed_data);
    self.check_signature(req.headers.signature, parsed_data)
      .then(function(ver) {
        if (ver) {
          self.logger.log('Valid signature from %s.',
            req.connection.remoteAddress);
          self.emit('valid_signature', parsed_data);
        } else {
          self.logger.error('Invalid signature from %s.',
            req.connection.remoteAddress);
        }
      })
      .catch(function(err) {
        self.logger.error(err);
      });

    reply(200, res);
  });
}

var TravisHook = function (options) {
  if (!(this instanceof TravisHook)) {
    return new TravisHook(options);
  }

  options = options || {};
  this.port = options.port || 3420;
  this.host = options.host || '0.0.0.0';
  this.public_key = options.public_key;
  this.https = this.https || true;
  this.api = options.api || 'api.travis-ci.org';
  this.logger = options.logger || console;

  // if (this.https) {
  //   this.server = Https.createServer(options.https, serverHandler.bind(this));
  // }
  // else {
    this.server = Http.createServer(serverHandler.bind(this));
  // }

  EventEmitter.call(this);
};

Util.inherits(TravisHook, EventEmitter);

TravisHook.prototype.check_signature = function(signature, data) {
  var self = this;

  return new Promise((resolve, reject) => {
    this.get_public_key()
      .then( (public_key) => {
        var decoded_sig = Buffer.from(signature, 'base64');
        var verifier = Crypto.createVerify('sha1');

        verifier.update(JSON.stringify(data));
        var ver = verifier.verify(public_key, decoded_sig, 'base64');

        resolve(ver);
      })
      .catch( (err) => {
        reject(err);
      });
  });
};

TravisHook.prototype.get_public_key = function() {
  var self = this;
  var options = {
    host: this.api,
    path: '/config'
  };

  return new Promise((resolve, reject) => {
    // Resolve early if we already know the signature.
    if (self.public_key){
      resolve(self.public_key);
    }

    const request = Https.get(options, (response) => {
      const statusCode = response.statusCode;

      if (statusCode < 200 || statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + statusCode));
      }

      const contentType = response.headers['content-type'];
      var buffer_obj = BufferObj();

      response.on('data', (chunk) => {
        buffer_obj.load(chunk);
      });

      response.on('end', (chunk) => {
        if (chunk) {
          buffer_obj.load(chunk);
        }

        buffer_obj.concat_toString();
        var payload = JSON.parse(buffer_obj.data);
        self.public_key = payload.config.notifications.webhook.public_key;
        // fs.writeFile('public_key', JSON.stringify(self.public_key), function(err){
        //   if (err) {
        //     return console.log(err);
        //   }
        //
        //   console.log("The file was saved!");
        // });
        resolve(self.public_key);
      });
    }).on('error', (err) => reject(err));
  });
};

TravisHook.prototype.listen = function (callback) {
  var self = this;
  self.server.listen(self.port, self.host, function() {
    self.logger.log(Util.format('listening for hook events on %s:%d', self.host, self.port));

    if (typeof callback === 'function') {
      callback();
    }
  });
};

module.exports = TravisHook;

// TravisHook.greet();
// port = 3000;
// host = '0.0.0.0';
// // console.log('Listening on port ' + port);
