var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var electionSchema = new Schema({
  cIId: {type: String, required: true},
  electionTitle: {type: String, required: true},
  electionDay: {type: Date, required: true},
  electionType: {type: String, enum: { values: ['primary', 'general', 'special'], message: 'Election type does not exist' }},
  ocdDivisionId: {type: String, required: true},
  previousElection: {type: Schema.Types.ObjectId, ref: 'Election'},
});

module.exports = mongoose.model('Election', electionSchema);

