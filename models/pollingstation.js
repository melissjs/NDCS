var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollingstationSchema = new Schema({
  precinctNumber: String,
  streetAddress: String,
  unitNumber: String,
  roomNumber: String,
  city: String,
  state: String,
  zip: Number
});

module.exports = mongoose.model('Pollingstation', pollingstationSchema);