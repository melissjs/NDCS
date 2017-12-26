var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var officevoteSchema = new Schema({
  voteId: String,
  electOfficeId: String,
  candidateValue: String,
  levelOfSupport: String
});

module.exports = mongoose.model('Officevote', officevoteSchema);