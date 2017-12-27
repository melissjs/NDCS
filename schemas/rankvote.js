const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RankvoteSchema = new Schema({
  candidate: { type: Schema.Types.ObjectId, ref: 'Candidate', required: [true, 'Candidate required'] },
  choice: { type: Number, enum: {values: [1, 2, 3, 4, 5], message: 'Must be 1-5' }, required: [true, 'Rank required'] }
});

module.exports = RankvoteSchema;