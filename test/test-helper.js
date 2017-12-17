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

// beforeEach((done) => {
//   mongoose.connection.collections.users.remove({})
//     .then(() => done())
//     .catch((e) => done(e));
// });

// beforeEach((done) => {
//   mongoose.connection.collections.volunteers.remove({})
//   .then(() => done())
//   .catch((e) => done(e));
// });

beforeEach((done) => {
  const { users, volunteers, pollingstations, elections } =  mongoose.connection.collections; 
  users.remove({})
  .then(volunteers.remove({}))
  // .then(pollingstations.remove({}))
  // .then(elections.remove({}))
  .then(() => done())
  .catch((e) => done(e));
});



