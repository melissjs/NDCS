var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const RankvoteSchema = new Schema({
  candidate: { type: Schema.Types.ObjectId, ref: 'Candidate' },
  choice: { type: Number, enum: {values: [1, 2, 3, 4, 5], message: 'Must be 1-5' } }
});

module.exports = RankvoteSchema;