const User = require('../models/user');
const assert = require('assert');

describe('Reading records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ username: 'joe', password: '11111111' });
    joe.save()
      .then(() => done());
  });

  it('Reads all users named Joe', (done) => {
    User.find({ username: 'joe'})
    .then((users) => {
      // assert(users[0]._id.toString() === joe._id.toString());
      var joeFromMongo = users.find((obj) => {return obj._id.toString() === joe._id.toString()});
      assert(joeFromMongo != undefined)
      done();
    })
  });

  it('finds a user with _id', (done) => {
    User.findOne({ _id: joe._id })
    .then((user) => {
      assert(user.username === 'joe');
      done();
    });
  })

})

