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
  const { users, pollingstations, elections, officevotes, electoffices, evidences, amendments, anomalies, audits, schedules } =  mongoose.connection.collections; 
  users.remove({})
  .then(pollingstations.remove({}))
  .then(schedules.remove({}))
  .then(elections.remove({}))
  .then(officevotes.remove({}))
  .then(electoffices.remove({}))
  .then(evidences.remove({}))
  .then(amendments.remove({}))
  .then(anomalies.remove({}))
  .then(audits.remove({}))
  .then(() => done())
  .catch((e) => done(e));
});



