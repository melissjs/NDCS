var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var electofficeSchema = new Schema({
  // id is created automatically
  electOfficeKey: String,
  office: String,
  election: String,
  mandatory: Boolean
});

module.exports = mongoose.model('Electoffice', electofficeSchema);