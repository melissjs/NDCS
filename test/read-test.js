const User = require('../models/user');
const assert = require('assert');
const THM = require('./test-helper-methods');

describe('Reading records', () => {
  let thisUser;

  beforeEach((done) => {
    thisUser = new User(THM.userObj);
    thisUser.save()
      .then(() => {
        done()
      });
  });

  it('Reads all users named thisUsername', (done) => {
    User.find({ username: 'thisUsername' })
    .then((users) => {
      assert(users[0]._id.toString() === thisUser._id.toString());
      done();
    })
  });

  it('finds a user with _id', (done) => {
    User.findOne({ _id: thisUser._id })
    .then((user) => {
      assert(user.username === 'thisUsername');
      done();
    });
  })

})

