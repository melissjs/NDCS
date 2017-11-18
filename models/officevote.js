var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var officevoteSchema = new Schema({
  // id is created automatically
  voteRecordKey: String,
  electOfficeKey: String,
  success: Boolean,
  candidateValue: String,
  levelOfSupport: String
});

module.exports = mongoose.model('Officevote', officevoteSchema);