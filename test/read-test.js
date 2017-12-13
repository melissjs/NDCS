const User = require('../models/user');
const assert = require('assert');

describe('Reading records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ username: 'Joe', password: '11111111' });
    joe.save()
      .then(() => done());
  });

  it('Reads all users named Joe', (done) => {
    User.find({ username: 'joe'})
    .then((users) => {
      console.log('heyyyyy', users);
      done();
    })
  });
})