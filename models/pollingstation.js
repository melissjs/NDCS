var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollingstationSchema = new Schema({
  electionId: { type: [Schema.Types.ObjectId], required: true, ref: 'Election' },
  precinctNumber: String,
  locationName:{ type: String, required: [true, 'LocationName required'] },
  streetAddress: { type: String, required: [true, 'Address required'] },
  line1: String,
  line2: String,
  line3: String,
  city: { type: String, required: [true, 'City required'] },
  state:  { type: String, required: [true, 'State required'] },
  zip:  { type: Number, required: [true, 'Zip code required'] },
  pollingHours: String,
  notes: String
});

module.exports = mongoose.model('Pollingstation', pollingstationSchema);