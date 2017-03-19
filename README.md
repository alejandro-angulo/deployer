# Deployer
Help automate deployments once Travis CI builds complete successfully.

This repo is still very much a work in progress. You should be able to include
this module to listen for webhooks from Travis (currently only works for Travis
but I think I may be able to make this more general) and execute any scripts
depending on the webhook's payload.

Here's an example:
```javascript
"use strict";

const exec = require('child_process').exec;
const TravisHook = require('./lib/travis_hook.js');

const repo = {
  name: 'testhooks',
  owner_name: 'vacuus'
};
const script_path = '/path/to/script.sh';
var Travis = TravisHook();
Travis.listen();

Travis.on('valid_signature', function(data) {
  if (data.status === 0) {
    console.log('Build passed.');
    if (repo.name === data.repository.name &&
      repo.owner_name === data.repository.owner_name) {
      console.log('Hook recevied for %s/%s', repo.owner_name, repo.name);
      console.log('Running `%s`', script_path);
      exec(script_path, (err, stdout, stderr) => {
        console.log(stdout);
      });
    }
  }
});
```
Executing code based on external data still seems pretty scary to me. Luckily,
[Travis signs their webhooks](https://docs.travis-ci.com/user/notifications/#Verifying-Webhook-requests)
so the module can attempt to verify the message received was actaully sent by
Travis (hopefully you trust Travis enough to essentialy grant remote execution
priviliges).

### Todo
* Can this be made more general (not specific to webhooks from Travis)?
* Have module run the scripts as well as verifying the messages.
* Improve logging.
