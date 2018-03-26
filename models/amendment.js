const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AuthSchema = require('../schemas/auth');

function validateAuthenticatingVolunteer() {
  return this.volunteerId.toString() != this.auth.authenticatingUserId.toString();
}

const amendmentSchema = new Schema({
  incorrectSelection: { type: String, required: [true, 'Incorrect selection required'] },
  correctSelection: { type: String, required: [true, 'Correct selection required'] },
  volunteerId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'VolunteerId required'] },
  // authenticatingVolunteerId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'AuthenticatingVolunteerId required'], validate: { validator: validateAuthenticatingVolunteer, message: "Volunteer may not authenticate self" } },
  auth: { type: AuthSchema, required: [true, 'AuthenticatingVolunteerId required'], validate: { validator: validateAuthenticatingVolunteer, message: 'Volunteer cannot authenticate self' } },
  electionId: { type: Schema.Types.ObjectId, ref: 'Election', required: [true, 'ElectionId required'] },
  timestamp: { type: Date, default: Date.now, required: [true, 'Timestamp required'] } // needed with auth??
});

module.exports = mongoose.model('Amendment', amendmentSchema);

