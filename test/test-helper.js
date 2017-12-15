const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/ndcDB_test', {useMongoClient: true});
  mongoose.connection
    .once('open', () => { 
      done();
    })
    .on('error', (error) => { 
      console.warn('Warning', error); 
    });
  });

beforeEach((done) => {
  mongoose.connection.collections.users.remove({})
    .then(() => done())
    .catch((e) => done(e));

  // mongoose.connection.collections.volunteers.remove({})
  // .then(() => done())
  // .catch((e) => done(e));
});




