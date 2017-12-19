var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollingstationSchema = new Schema({
  // electionId: {type: Schema.Types.ObjectId, required: true, ref: 'Election'},
  precinctNumber: String,
  streetAddress: String,
  unitNumber: String,
  roomNumber: String,
  city: String,
  state: String,
  zip: Number
});

module.exports = mongoose.model('Pollingstation', pollingstationSchema);