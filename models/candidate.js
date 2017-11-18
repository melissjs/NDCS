var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var candidateSchema = new Schema({
  // id is created automatically
  value: Number,
  label: String,
  party: String,
  electOfficeKey: String
});

module.exports = mongoose.model('Candidate', candidateSchema);