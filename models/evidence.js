var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var evidenceSchema = new Schema({
  kind: { type: String, required: [true, 'Kind of evidence required'], enum: ['audio', 'video', 'image'] },
  fileName: { type: String, required: true },
  tags: { type: [String], enum: { values: ['given-incorrect-ballot', 'polling-station-problem', 'other-comment', 'about-dc'], message: "Category does not exist" }},
  anomalyId: { type: [Schema.Types.ObjectId], ref: 'Anomaly' }
});

module.exports = mongoose.model('Evidence', evidenceSchema);