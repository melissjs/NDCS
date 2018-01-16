const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TimesheetSchema = require('../schemas/timesheet');

function ShiftValidator(shiftArray) {
	return shiftArray.every((shift)=>{
    return (shift>0 && shift<7)  
  })
}

const ScheduleSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'UserId required'] },
  auditId: { type: Schema.Types.ObjectId, ref: 'Audit', required: [true, 'AuditId required'] },
  shifts: { type: [Number], validate: {validator: ShiftValidator, message: 'Invalid shift options' } },
  timeSheet: { type: [TimesheetSchema] },
  completed: { type: Boolean, default: false }
},
// {
//   toObject: { virtuals: true }, 
//   toJSON: { virtuals: true } 
// }
);

// finds team of users for schedule object
// ScheduleSchema.statics.currentTeam = async function(electionId, pollingStationId) {
//   const team = [];
//   try {
//     const teamSchedules = await this.find({ 
//       pollingStationId: pollingStationId,
//       electionId: electionId
//     })
//     teamSchedules.forEach((sched) => {
//       team.push(sched.userId);
//     })
//     return team;
//   }
//   catch(e) {
//     return e;
//   }
// }

module.exports = mongoose.model('Schedule', ScheduleSchema);

