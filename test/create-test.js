const User = require('../models/user');
const assert = require('assert');

describe('Creating records', () => {
  it('saves a user', (done) => {
    const thisUser = new User({
      username: 'thisUsername',
      password: 'thisPassword'
    });
    thisUser.save()
      .then(() => {
        assert(!thisUser.isNew);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
})