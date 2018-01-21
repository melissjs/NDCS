const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TimesheetSchema = require('../schemas/timesheet');
const JoinhistorySchema = require('../schemas/joinhistory');

function ShiftValidator(shiftArray) {
	return shiftArray.every((shift)=>{
    return (shift>0 && shift<7)  
  })
}

const ScheduleSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'UserId required'] },
  auditId: { type: Schema.Types.ObjectId, ref: 'Audit', required: [true, 'AuditId required'] },
  joinHistory:  { type: [JoinhistorySchema], required: [true, 'JoinHistory required'] },
  shifts: { type: [Number], validate: {validator: ShiftValidator, message: 'Invalid shift options' } },
  timeSheet: { type: [TimesheetSchema] },
  exitReview: { type: Schema.Types.ObjectId, ref: 'Exitreview' },
  auditorReviews: { type: [Schema.Types.ObjectId], ref: 'Auditorreview' },
},
{
  toObject: { virtuals: true }, 
  toJSON: { virtuals: true } 
}
);

//////////// STILL TO DO //////////////
//require exitreview if shiftsFinished && showedup

//////////// VIRTUAL TO DO //////////////
// showedUp: { type: Boolean, default: false }
// completedAllShifts: { type: Boolean, default: false }
// reviews for this user


ScheduleSchema.virtual('active').get(async function() {
  const Audit = mongoose.model('Audit');
  let audit = await Audit.findById(this.auditId);
  return (audit.active && this.joinHistory[this.joinHistory.length -1].isMember) ? true : false;
});

// middleware disallows saving sixth schedule for same, active election, also flags user lockdown
ScheduleSchema.pre('save', function(next) {
const User = mongoose.model('User');
User.findById(this.userId)
  .then((user) => {
    if (user.scheduleCount <= 5) {
      next()
    } // deactivate schedules and flag user/deactivate account 
    else {
      user.schedule.some((sched) => {
        if (sched.active) { 
          sched.joinHistory.push({
            isMember: false,
            selfInitiated: false,
            joiningUserId: globals.admin,
            date: Date.now(),
          });
        }
      })
       user.status = 'lockdown';
       return;
    }
  })
})

module.exports = mongoose.model('Schedule', ScheduleSchema);


