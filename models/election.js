var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let types = ['primary', 'general', 'special']
function typeValidator(type) {
  return types.includes(type);
}

var electionSchema = new Schema({
  pollingStationId: {type: [Schema.Types.ObjectId], ref: 'Pollingstation'},
  electionTitle: String,
  electionType: {type: String, validate: {validator: typeValidator, message: 'Type does not exist'}},
  country: String
});

module.exports = mongoose.model('Election', electionSchema);