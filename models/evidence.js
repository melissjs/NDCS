var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var evidenceSchema = new Schema({
  kind: { type: String, required: [true, 'Kind required'], enum: { values: ['audio', 'video', 'image'], message: 'Kind does not exist' } },
  fileName: { type: String, required: [true, 'FileName required'] },
  tags: { type: [String], enum: { values: ['givenIncorrectBallot', 'pollingStationProblem', 'otherComment', 'aboutDc', 'suggestion'], message: 'Category does not exist' } },
  anomalyId: { type: Schema.Types.ObjectId, ref: 'Anomaly', required: [true, 'AnomalyId required'] }
});

module.exports = mongoose.model('Evidence', evidenceSchema);