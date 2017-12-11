var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator')

var volunteerSchema = new Schema({
  volunteerKey: {type: Schema.Types.ObjectId, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  emailAddress: {type: String, required: true, unique: true, uniqueCaseInsensitive: true},
  exposeEmail: {type: Boolean, required: true},
  phoneNumber: {type: String, required: true, unique: true, uniqueCaseInsensitive: true},
  age: {type: Number, required: true},
  sex: {type: String, required: true},
  partyAffiliation: {type: String, required: true},
  shifts: {type: [String], required: false},
  associatedPollingStationKey: {type: Schema.Types.ObjectId, ref: 'Pollingstation', required: false}
});

volunteerSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('Volunteer', volunteerSchema);