const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuditorreviewSchema = new Schema({
  reviewerId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'ReviewerId required'] },
  auditId: { type: Schema.Types.ObjectId, ref: 'Audit', required: [true, 'AuditId required'] },
  revieweeId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'RevieweeId required'] },
  punctuality: { type: Number, min: [1, 'Must be at least 1'], max: [5, 'Must be 5 or less'] },
  reliability: { type: Number, min: [1, 'Must be at least 1'], max: [5, 'Must be 5 or less'] },
  overallGrade: { type: Number, min: [1, 'Must be at least 1'], max: [5, 'Must be 5 or less'] },
  activityLevel: { type: Number, min: [1, 'Must be at least 1'], max: [5, 'Must be 5 or less'] },
  demeanor: { type: Number, min: [1, 'Must be at least 1'], max: [5, 'Must be 5 or less'] },
  leadership: { type: Number, min: [1, 'Must be at least 1'], max: [5, 'Must be 5 or less'] },
  comments: String
});

module.exports = mongoose.model('Auditorreview', AuditorreviewSchema);

