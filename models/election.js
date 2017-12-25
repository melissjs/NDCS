var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// let types = ['primary', 'general', 'special']
// function typeValidator(type) {
//   return types.includes(type);
// }

// https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyA-6aK12lgyFf73RWeIBuH0Cdg_K9wsWX4

var electionSchema = new Schema({
  cIId: {type: String, required: true},
  pollingStations: {type: [Schema.Types.ObjectId], ref: 'Pollingstation'},
  electionTitle: {type: String, required: true},
  electionDay: {type: Date, required: true},
  electionType: {type: String, enum: {validator: values: ['primary', 'general', 'special'], message: 'Election type does not exist'}},
  ocdDivisionId: {type: String, required: true},
});

module.exports = mongoose.model('Election', electionSchema);

