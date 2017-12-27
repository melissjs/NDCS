const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const electofficeSchema = new Schema({
  election: { type: Schema.Types.ObjectId, ref: 'Election', required: [true, 'Election required'] },
  office: { type: String, required: [true, 'Office required'] },
  mandatory: { type: Boolean, required: [true, 'Mandatory required'] },
});

module.exports = mongoose.model('Electoffice', electofficeSchema);