const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuditorreviewSchema = new Schema({
  reviewerId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'ReviewerId required'] },
  auditId: { type: Schema.Types.ObjectId, ref: 'Audit', required: [true, 'AuditId required'] },
  pollingStationStaff: { type: Number, min: [1, 'Must be at least 1'], max: [5, 'Must be 5 or less'] },
  organized: { type: Number, min: [1, 'Must be at least 1'], max: [5, 'Must be 5 or less'] },
  howWellStaffed: { type: Number, min: [1, 'Must be at least 1'], max: [5, 'Must be 5 or less'] },
  management: { type: Number, min: [1, 'Must be at least 1'], max: [5, 'Must be 5 or less'] },
  leads: { type: Number, min: [1, 'Must be at least 1'], max: [5, 'Must be 5 or less'] },
  auditors: { type: Number, min: [1, 'Must be at least 1'], max: [5, 'Must be 5 or less'] },
  stipend: Boolean,
  stipendImportance: { type: Number, min: [1, 'Must be at least 1'], max: [5, 'Must be 5 or less'] },
  overallExperience: { type: Number, min: [1, 'Must be at least 1'], max: [5, 'Must be 5 or less'] },
  wouldDoAgain: Boolean,
  comments: String
});

module.exports = mongoose.model('Auditorreview', AuditorreviewSchema);

