const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ndcDB');

mongoose.connection
  .once('open', () => { console.log('Opened connection') })
  .on('error', (error) => { console.log('Warning', error) });

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
