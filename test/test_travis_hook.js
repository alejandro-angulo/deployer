"use strict";

const describe = require('mocha').describe;
const it = require('mocha').it;
const assert = require('assert');
const expect = require('chai').expect;

const TravisHook = require('../lib/travis_hook.js');

describe('Webhook Verification', function() {
  it('check_signature()', function() {
    var signature = 'TE/hKDsBjTLWMyChmCS60mp3ofhAeHItFBJHuoZGrgsaKUrKKRWbhBdIuc2I1wAK5Km0mXnKok8D6pGblQw6gjvgTuW+u41oBlX6OsINspXIT7bpknlOvXRg7QU2A/+k09IEoAz0ehrAm/PIbQkL0Nf+1BO5Af9SwKHIXujgqJSY31cDk0+fsxGxgoN0EkKYalm+929PBt+KTMuNl0kDPpea7VaftTgppFt0NU2TtqzWPV4zqF26c/xaFfrjAcYcXt4lZoD/JilrSr5cCs1U6v6g+aw6zbI8SCUhjmL7cOE0ZPIVFAMZ9mZK00pChgfK/ivsyyJDSnZ9XwrmAKKRvQ==';
    var data = {"id":192588220,"repository":{"id":11672877,"name":"testhooks","owner_name":"vacuus","url":null},"number":"2","config":{"language":"python","script":["echo 'test'"],"notifications":{"webhooks":["http://5ec8970c.ngrok.io/"]},".result":"configured","group":"stable","dist":"precise"},"status":0,"result":0,"status_message":"Passed","result_message":"Passed","started_at":"2017-01-17T06:42:59Z","finished_at":"2017-01-17T06:43:19Z","duration":20,"build_url":"https://travis-ci.org/vacuus/testhooks/builds/192588220","commit_id":55032628,"commit":"db494b27455aa8fba1b40a556b3f68dcec6966a7","base_commit":null,"head_commit":null,"branch":"diff_branch","message":"try again..","compare_url":"https://github.com/vacuus/testhooks/compare/dad7ad742697...db494b27455a","committed_at":"2017-01-17T06:42:34Z","author_name":"Alejandro Angulo","author_email":"aab.j13@gmail.com","committer_name":"Alejandro Angulo","committer_email":"aab.j13@gmail.com","matrix":[{"id":192588221,"repository_id":11672877,"parent_id":192588220,"number":"2.1","state":"finished","config":{"language":"python","script":["echo 'test'"],"notifications":{"webhooks":["http://5ec8970c.ngrok.io/"]},".result":"configured","group":"stable","dist":"precise","os":"linux"},"status":0,"result":0,"commit":"db494b27455aa8fba1b40a556b3f68dcec6966a7","branch":"diff_branch","message":"try again..","compare_url":"https://github.com/vacuus/testhooks/compare/dad7ad742697...db494b27455a","started_at":"2017-01-17T06:42:59Z","finished_at":"2017-01-17T06:43:19Z","committed_at":"2017-01-17T06:42:34Z","author_name":"Alejandro Angulo","author_email":"aab.j13@gmail.com","committer_name":"Alejandro Angulo","committer_email":"aab.j13@gmail.com","allow_failure":false}],"type":"push","state":"passed","pull_request":false,"pull_request_number":null,"pull_request_title":null,"tag":null};

    var Travis = TravisHook();

    return Travis.check_signature(signature, data)
      .then( (auth) => {
        expect(auth).to.eql(true);
      });
  });

  it('check_signature() (Wrong Public Key)', function () {
    var signature = 'TE/hKDsBjTLWMyChmCS60mp3ofhAeHItFBJHuoZGrgsaKUrKKRWbhBdIuc2I1wAK5Km0mXnKok8D6pGblQw6gjvgTuW+u41oBlX6OsINspXIT7bpknlOvXRg7QU2A/+k09IEoAz0ehrAm/PIbQkL0Nf+1BO5Af9SwKHIXujgqJSY31cDk0+fsxGxgoN0EkKYalm+929PBt+KTMuNl0kDPpea7VaftTgppFt0NU2TtqzWPV4zqF26c/xaFfrjAcYcXt4lZoD/JilrSr5cCs1U6v6g+aw6zbI8SCUhjmL7cOE0ZPIVFAMZ9mZK00pChgfK/ivsyyJDSnZ9XwrmAKKRvQ==';
    var data = {"id":192588220,"repository":{"id":11672877,"name":"testhooks","owner_name":"vacuus","url":null},"number":"2","config":{"language":"python","script":["echo 'test'"],"notifications":{"webhooks":["http://5ec8970c.ngrok.io/"]},".result":"configured","group":"stable","dist":"precise"},"status":0,"result":0,"status_message":"Passed","result_message":"Passed","started_at":"2017-01-17T06:42:59Z","finished_at":"2017-01-17T06:43:19Z","duration":20,"build_url":"https://travis-ci.org/vacuus/testhooks/builds/192588220","commit_id":55032628,"commit":"db494b27455aa8fba1b40a556b3f68dcec6966a7","base_commit":null,"head_commit":null,"branch":"diff_branch","message":"try again..","compare_url":"https://github.com/vacuus/testhooks/compare/dad7ad742697...db494b27455a","committed_at":"2017-01-17T06:42:34Z","author_name":"Alejandro Angulo","author_email":"aab.j13@gmail.com","committer_name":"Alejandro Angulo","committer_email":"aab.j13@gmail.com","matrix":[{"id":192588221,"repository_id":11672877,"parent_id":192588220,"number":"2.1","state":"finished","config":{"language":"python","script":["echo 'test'"],"notifications":{"webhooks":["http://5ec8970c.ngrok.io/"]},".result":"configured","group":"stable","dist":"precise","os":"linux"},"status":0,"result":0,"commit":"db494b27455aa8fba1b40a556b3f68dcec6966a7","branch":"diff_branch","message":"try again..","compare_url":"https://github.com/vacuus/testhooks/compare/dad7ad742697...db494b27455a","started_at":"2017-01-17T06:42:59Z","finished_at":"2017-01-17T06:43:19Z","committed_at":"2017-01-17T06:42:34Z","author_name":"Alejandro Angulo","author_email":"aab.j13@gmail.com","committer_name":"Alejandro Angulo","committer_email":"aab.j13@gmail.com","allow_failure":false}],"type":"push","state":"passed","pull_request":false,"pull_request_number":null,"pull_request_title":null,"tag":null};
    var wrong_key = '-----BEGIN PUBLIC KEY-----\n' +
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvtjdLkS+FP+0fPC09j25\n' +
      'y/PiuYDDivIT86COVedvlElk99BBYTrqNaJybxjXbIZ1Q6xFNhOY+iTcBr4E1zJu\n' +
      'tizF3Xi0V9tOuP/M8Wn4Y/1lCWbQKlWrNQuqNBmhovF4K3mDCYswVbpgTmp+JQYu\n' +
      'Bm9QMdieZMNry5s6aiMA9aSjDlNyedvSENYo18F+NYf1J0C0JiPYTxheCb4optr1\n' +
      '5xNzFKhAkuGs4XTOA5C7Q06GCKtDNf44s/CVE30KODUxBi0MCKaxiXw/yy55zxX2\n' +
      '/YdGphIyQiA5iO1986ZmZCLLW8udz9uhW5jUr3Jlp9LbmphAC61bVSf4ou2YsJaN\n' +
      '0QIDAQAB\n' +
      '-----END PUBLIC KEY-----';

    var Travis = TravisHook({
      'public_key': wrong_key
    });

    return Travis.check_signature(signature, data)
      .then( (auth) => {
        expect(auth).to.eql(false);
      });
  });

  it('check_signature() (Wrong Signature)', function () {
    var signature = 'TE/hKDsBdTLWMyChmCS60mp3ofhAeHItFBJHuoZGrgsaKUrKKRWbhBdIuc2I1wAK5Km0mXnKok8D6pGblQw6gjvgTuW+u41oBlX6OsINspXIT7bpknlOvXRg7QU2A/+k09IEoAz0ehrAm/PIbQkL0Nf+1BO5Af9SwKHIXujgqJSY31cDk0+fsxGxgoN0EkKYalm+929PBt+KTMuNl0kDPpea7VaftTgppFt0NU2TtqzWPV4zqF26c/xaFfrjAcYcXt4lZoD/JilrSr5cCs1U6v6g+aw6zbI8SCUhjmL7cOE0ZPIVFAMZ9mZK00pChgfK/ivsyyJDSnZ9XwrmAKKRvQ==';
    var data = {"id":192588220,"repository":{"id":11672877,"name":"testhooks","owner_name":"vacuus","url":null},"number":"2","config":{"language":"python","script":["echo 'test'"],"notifications":{"webhooks":["http://5ec8970c.ngrok.io/"]},".result":"configured","group":"stable","dist":"precise"},"status":0,"result":0,"status_message":"Passed","result_message":"Passed","started_at":"2017-01-17T06:42:59Z","finished_at":"2017-01-17T06:43:19Z","duration":20,"build_url":"https://travis-ci.org/vacuus/testhooks/builds/192588220","commit_id":55032628,"commit":"db494b27455aa8fba1b40a556b3f68dcec6966a7","base_commit":null,"head_commit":null,"branch":"diff_branch","message":"try again..","compare_url":"https://github.com/vacuus/testhooks/compare/dad7ad742697...db494b27455a","committed_at":"2017-01-17T06:42:34Z","author_name":"Alejandro Angulo","author_email":"aab.j13@gmail.com","committer_name":"Alejandro Angulo","committer_email":"aab.j13@gmail.com","matrix":[{"id":192588221,"repository_id":11672877,"parent_id":192588220,"number":"2.1","state":"finished","config":{"language":"python","script":["echo 'test'"],"notifications":{"webhooks":["http://5ec8970c.ngrok.io/"]},".result":"configured","group":"stable","dist":"precise","os":"linux"},"status":0,"result":0,"commit":"db494b27455aa8fba1b40a556b3f68dcec6966a7","branch":"diff_branch","message":"try again..","compare_url":"https://github.com/vacuus/testhooks/compare/dad7ad742697...db494b27455a","started_at":"2017-01-17T06:42:59Z","finished_at":"2017-01-17T06:43:19Z","committed_at":"2017-01-17T06:42:34Z","author_name":"Alejandro Angulo","author_email":"aab.j13@gmail.com","committer_name":"Alejandro Angulo","committer_email":"aab.j13@gmail.com","allow_failure":false}],"type":"push","state":"passed","pull_request":false,"pull_request_number":null,"pull_request_title":null,"tag":null};

    var Travis = TravisHook();

    return Travis.check_signature(signature, data)
      .then( (auth) => {
        expect(auth).to.eql(false);
      });
  });

  it('check_signature() (invalid public key)', function() {
    var signature = 'TE/hKDsBdTLWMyChmCS60mp3ofhAeHItFBJHuoZGrgsaKUrKKRWbhBdIuc2I1wAK5Km0mXnKok8D6pGblQw6gjvgTuW+u41oBlX6OsINspXIT7bpknlOvXRg7QU2A/+k09IEoAz0ehrAm/PIbQkL0Nf+1BO5Af9SwKHIXujgqJSY31cDk0+fsxGxgoN0EkKYalm+929PBt+KTMuNl0kDPpea7VaftTgppFt0NU2TtqzWPV4zqF26c/xaFfrjAcYcXt4lZoD/JilrSr5cCs1U6v6g+aw6zbI8SCUhjmL7cOE0ZPIVFAMZ9mZK00pChgfK/ivsyyJDSnZ9XwrmAKKRvQ==';
    var data = {"id":192588220,"repository":{"id":11672877,"name":"testhooks","owner_name":"vacuus","url":null},"number":"2","config":{"language":"python","script":["echo 'test'"],"notifications":{"webhooks":["http://5ec8970c.ngrok.io/"]},".result":"configured","group":"stable","dist":"precise"},"status":0,"result":0,"status_message":"Passed","result_message":"Passed","started_at":"2017-01-17T06:42:59Z","finished_at":"2017-01-17T06:43:19Z","duration":20,"build_url":"https://travis-ci.org/vacuus/testhooks/builds/192588220","commit_id":55032628,"commit":"db494b27455aa8fba1b40a556b3f68dcec6966a7","base_commit":null,"head_commit":null,"branch":"diff_branch","message":"try again..","compare_url":"https://github.com/vacuus/testhooks/compare/dad7ad742697...db494b27455a","committed_at":"2017-01-17T06:42:34Z","author_name":"Alejandro Angulo","author_email":"aab.j13@gmail.com","committer_name":"Alejandro Angulo","committer_email":"aab.j13@gmail.com","matrix":[{"id":192588221,"repository_id":11672877,"parent_id":192588220,"number":"2.1","state":"finished","config":{"language":"python","script":["echo 'test'"],"notifications":{"webhooks":["http://5ec8970c.ngrok.io/"]},".result":"configured","group":"stable","dist":"precise","os":"linux"},"status":0,"result":0,"commit":"db494b27455aa8fba1b40a556b3f68dcec6966a7","branch":"diff_branch","message":"try again..","compare_url":"https://github.com/vacuus/testhooks/compare/dad7ad742697...db494b27455a","started_at":"2017-01-17T06:42:59Z","finished_at":"2017-01-17T06:43:19Z","committed_at":"2017-01-17T06:42:34Z","author_name":"Alejandro Angulo","author_email":"aab.j13@gmail.com","committer_name":"Alejandro Angulo","committer_email":"aab.j13@gmail.com","allow_failure":false}],"type":"push","state":"passed","pull_request":false,"pull_request_number":null,"pull_request_title":null,"tag":null};
    var invalid_key = '-----BEGIN PUBLIC KEY-----asdf-----END PUBLIC KEY-----';

    var Travis = TravisHook({
      'public_key': invalid_key
    });

    return Travis.check_signature(signature, data)
      .then ( (auth) => {
        assert(false, 'Error should have been thrown (invalid public key)');
      }, (err) => {});
  });

  it('get_signature()', function() {
    var Travis = TravisHook();
    /* Public key as of 26 Feb. 2017 */
    var correct_key = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvtjdLkS+FP+0fPC09j25\ny/PiuYDDivIT86COVedvlElk99BBYTrqNaJybxjXbIZ1Q6xFNhOY+iTcBr4E1zJu\ntizF3Xi0V9tOuP/M8Wn4Y/1lCWbQKlWrNQuqNBmhovF4K3mDCYswVbpgTmp+JQYu\nBm9QMdieZMNry5s6aiMA9aSjDlNyedvSENYo18F+NYg1J0C0JiPYTxheCb4optr1\n5xNzFKhAkuGs4XTOA5C7Q06GCKtDNf44s/CVE30KODUxBi0MCKaxiXw/yy55zxX2\n/YdGphIyQiA5iO1986ZmZCLLW8udz9uhW5jUr3Jlp9LbmphAC61bVSf4ou2YsJaN\n0QIDAQAB\n-----END PUBLIC KEY-----";
    return Travis.get_public_key()
      .then ( (key) => {
        expect(key).to.eql(correct_key);
      });
  });
});
