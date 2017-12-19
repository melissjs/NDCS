// const User = require('../models/user');
// const assert = require('assert');

// describe('Updating records', () => {
//   let thisUser;

//   beforeEach((done) => {
//     thisUser = new User({ username: 'thisUsername', password: 'thisPassword' });
//     thisUser.save()
//       .then(() => done());
//   });

//   function assertName(operation, done) {
//     operation
//     .then(() => {
//       User.find({})
//         .then((users) => {
//           assert(users.length === 1);
//           assert(users[0].username === 'thisOtherUsername');
//           done();
//         })
//     })
//   }

//   it('Model instance set and save', (done) => {
//     thisUser.set('username', 'thisOtherUsername');
//     assertName(thisUser.save(), done);
//   });

//   it('Model instance update', (done) => {
//     assertName(thisUser.update({ username: 'thisOtherUsername' }), done);
//   })

//   it('Class update', (done) => {
//     assertName(User.update({ username: 'thisUsername' }, { username: 'thisOtherUsername' }), done);
//   })

//   it('Class update findOneAndUpdate', (done) => {
//     assertName(User.findOneAndUpdate({ username: 'thisUsername' }, { username: 'thisOtherUsername' }), done);
//   })

//   it('Class update findByIdAndUpdate', (done) => {
//     assertName(User.findByIdAndUpdate(thisUser._id, {username: 'thisOtherUsername'}), done);
//   })

// })

