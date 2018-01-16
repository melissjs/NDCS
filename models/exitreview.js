const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TimesheetSchema = require('../schemas/timesheet');

function ShiftValidator(shiftArray) {
	return shiftArray.every((shift)=>{
    return (shift>0 && shift<7)  
  })
}

const AuditorreviewSchema = new Schema({
  reviewerId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'ReviewerId required'] },
  auditId: { type: Schema.Types.ObjectId, ref: 'Audit', required: [true, 'AuditId required'] },
  pollingStationStaff:
  organized:
  howWellStaffed:
  management:
  leads:
  auditors:
  stipend:
  stipendImportance:
  overallExperience:
  wouldDoAgain:
  comments:
});

module.exports = mongoose.model('Auditorreview', AuditorreviewSchema);

