var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var volunteerSchema = new Schema({
  // id is created automatically
  volunteerKey: String,
  firstName: String,
  lastName: String,
  emailAddress: String,
  exposeEmail: Boolean,
  phoneNumber: String,
  age: Number,
  sex: String,
  partyAffiliation: String,
  shifts: String,
  associatedPollingStationKey: String
});

module.exports = mongoose.model('Volunteer', volunteerSchema);