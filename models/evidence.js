const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const evidenceSchema = new Schema({
  originRecord: { type: String, required: [true, 'OriginRecord required'], enum: { values: ['anomaly', 'vote'], message: 'OriginRecord type not recognized' } },
  kind: { type: String, required: [true, 'Kind required'], enum: { values: ['audio', 'video', 'image'], message: 'Kind does not exist' } },
  fileName: { type: String, required: [true, 'FileName required'] },
  tags: { type: [String], enum: { values: ['givenIncorrectBallot', 'pollingStationProblem', 'otherComment', 'aboutDc', 'suggestion'], message: 'Category does not exist' } },
  anomalyId: { type: Schema.Types.ObjectId, ref: 'Anomaly', required: [function(){this.originRecord === 'Anomaly'}, 'AnomalyId required'] },
  voteId: { type: Schema.Types.ObjectId, ref: 'Vote', required: [function(){this.originRecord === 'Vote'}, 'VoteId required'] },
});

module.exports = mongoose.model('Evidence', evidenceSchema);