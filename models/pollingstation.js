var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollingstationSchema = new Schema({
  // id is created automatically
  pollingStationKey: Schema.Types.ObjectId,
  precinctNumber: String,
  streetAddress: String,
  unitNumber: String,
  roomNumber: String,
  city: String,
  state: String,
  zip: Number
});

module.exports = mongoose.model('Pollingstation', pollingstationSchema);