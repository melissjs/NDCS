var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var electofficeSchema = new Schema({
  election: {type: Schema.Types.ObjectId, ref: 'Election'},
  office: String,
  mandatory: Boolean
});

module.exports = mongoose.model('Electoffice', electofficeSchema);