var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var candidateSchema = new Schema({
  name: String,
  party: String,
  electOffice: { type: [Schema.Types.ObjectId], ref: 'Electoffice' },
});

module.exports = mongoose.model('Candidate', candidateSchema);