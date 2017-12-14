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
    .then(() => {console.log('remove all'); done()})
    .catch((e) => done(e));
});




