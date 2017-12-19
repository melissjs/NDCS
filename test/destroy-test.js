const User = require('../models/user');
const assert = require('assert');
const THM = require('./test-helper-methods');

describe('Deleting records', () => {
  let thisUser;

  beforeEach((done) => {
    thisUser = THM.thisUser;
    thisUser.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    thisUser.remove()
      .then(() => {
        User.findOne({ username: 'thisUsername' })
          .then((user) => {
            assert(user === null);
            done();
          });
      });
  });

  it('class method remove', (done) => {
    // removes many with given criteria
    User.remove({ username: 'thisUsername' })
      .then(() => {
        User.findOne({ username: 'thisUsername' })
          .then((user) => {
            assert(user === null);
            done();
          });
      });
  })

  it('class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ username: 'thisUsername' })
    .then(() => {
      User.findOne({ username: 'thisUsername' })
        .then((user) => {
          assert(user === null);
          done();
        });
    });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(thisUser._id)
    .then(() => {
      User.findOne({ username: 'thisUsername' })
        .then((user) => {
          assert(user === null);
          done();
        });
    });
  });

})

