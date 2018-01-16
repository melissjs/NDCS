const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TimesheetSchema = require('../schemas/timesheet');

function ShiftValidator(shiftArray) {
	return shiftArray.every((shift)=>{
    return (shift>0 && shift<7)  
  })
}

const AuditorreviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'UserId required'] },
  auditId: { type: Schema.Types.ObjectId, ref: 'Audit', required: [true, 'AuditId required'] },
  completed: { type: Boolean, default: false },
  comments:
  showedUp:
  punctuality:
  overallGrade:
  activityLevel:
  demeanor:
  leadership:

  organizedDC:
  managementDC:
  leadsDC:
  auditorsDC:
  overallExperienceDC:
  wouldDoAgainDC:
  commentsDC:
  stipendImportanceDC:
});

module.exports = mongoose.model('Schedule', AuditorreviewSchema);

