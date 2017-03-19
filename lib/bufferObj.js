var BufferObj = function () {
  if (!(this instanceof BufferObj)) {
    return new BufferObj();
  }

  this.contents = [];
  this.buffer_length = 0;
  this.data = '';
};

BufferObj.prototype.concat_toString = function() {
  this.data = Buffer.concat(this.contents, this.buffer_length).toString();
};

BufferObj.prototype.load = function(chunk) {
  this.contents.push(chunk);
  this.buffer_length += chunk.length;
};

module.exports = BufferObj;
