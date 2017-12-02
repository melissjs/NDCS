var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var volunteerSchema = new Schema({
  // id is created automatically
  volunteerKey: Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  emailAddress: String,
  exposeEmail: Boolean,
  phoneNumber: String,
  age: Number,
  sex: String,
  partyAffiliation: String,
  shifts: String,
  associatedPollingStationKey: [{type: Schema.Types.ObjectId, ref: 'Pollingstation'}]
});

module.exports = mongoose.model('Volunteer', volunteerSchema);