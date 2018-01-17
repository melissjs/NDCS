const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const electionSchema = new Schema({
  cIId: { type: String },
  electionTitle: { type: String, required: [true, 'ElectionTitle required'] },
  electionDay: { type: Date, required: [true, 'ElectionDay required'] },
  electionType: { type: String, enum: { values: ['primary', 'general', 'special'], message: 'Election type does not exist' }, required: [true, 'ElectionType required'] },
  ocdDivisionId: { type: String },
  previousElection: { type: Schema.Types.ObjectId, ref: 'Election', required: [true, 'PreviousElection required'] },
});

electionSchema.virtual('active').get(function() {
  return ((Date.parse(this.electionDay) + 86400000) < Date.now()) ? false : true;
});

module.exports = mongoose.model('Election', electionSchema);

