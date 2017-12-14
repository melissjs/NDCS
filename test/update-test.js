const User = require('../models/user');
const assert = require('assert');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ username: 'joe', password: '11111111' });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
    .then(() => {
      User.find({})
        .then((users) => {
          assert(users.length === 1);
          assert(users[0].username === 'alex');
          done();
        })
    })
  }

  it('Model instance set and save', (done) => {
    joe.set('username', 'alex');
    assertName(joe.save(), done);
  });

  it('Model instance update', (done) => {
    assertName(joe.update({ username: 'alex' }), done);
  })

  it('Class update', (done) => {
    assertName(User.update({ username: 'joe' }, { username: 'alex' }), done);
  })

  it('Class update findOneAndUpdate', (done) => {
    assertName(User.findOneAndUpdate({ username: 'joe' }, { username: 'alex' }), done);
  })

  it('Class update findByIdAndUpdate', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, {username: 'alex'}), done);
  })

})

