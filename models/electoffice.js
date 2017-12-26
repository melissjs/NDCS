var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var electofficeSchema = new Schema({
  election: String,
  office: String,
  mandatory: Boolean
});

module.exports = mongoose.model('Electoffice', electofficeSchema);