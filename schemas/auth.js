const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// function validateAuthenticatingVolunteer() {
//   const User = require('../models/user');
//   let ans;
//   return User.findById(this.electOfficeId, function(err, result) {
//     if (err) {
//       console.log('ERR', err)
//       return false
//     } else {
//       ans = (result.mandatory === true && validateObj.length === 0) ? false : true;
//     }
//   }).then(() => ans)
//   return this.volunteerId.toString() != this.authenticatingVolunteerId.toString();
// }

// function validateAuthenticatingVolunteer() {
//   return this.volunteerId.toString() != this.authenticatingVolunteerId.toString();
// }

const AuthSchema = new Schema({
  // authenticatingUserId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'AuthenticatingUserId required'], validate: { validator: authValidator, message: 'User cannot authenticate self' } },
  authenticatingUserId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'AuthenticatingUserId required'] },
  date: { type: [Date], required: [true, 'Authentication date required'] }
});

module.exports = AuthSchema;