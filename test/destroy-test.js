const User = require('../models/user');
const assert = require('assert');

describe('Deleting records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ username: 'joe', password: '11111111' });
    joe.save()
      .then(() => done());
  });

  it('model instance remove', (done) => {
    joe.remove()
      .then(() => {
        User.findOne({ username: 'joe' })
          .then((user) => {
            assert(user === null);
            done();
          });
      });
  });

  it('class method remove', (done) => {
    // removes many with given criteria
    User.remove({ username: 'joe' })
      .then(() => {
        User.findOne({ username: 'joe' })
          .then((user) => {
            assert(user === null);
            done();
          });
      });
  })

  it('class methos findOneAndRemove', (done) => {
    User.findOneAndRemove({ username: 'joe' })
    .then(() => {
      User.findOne({ username: 'joe' })
        .then((user) => {
          assert(user === null);
          done();
        });
    });
  });

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
    .then(() => {
      User.findOne({ username: 'joe' })
        .then((user) => {
          assert(user === null);
          done();
        });
    });
  });

})

