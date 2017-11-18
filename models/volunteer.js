var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var volunteerSchema = new Schema({
  // id is created automatically
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String
});

module.exports = mongoose.model('Volunteer', volunteerSchema);