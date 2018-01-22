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

/* RETURN IF AUDIT IS ACTIVE */
ScheduleSchema.virtual('effective').get(async function() {
  const Audit = mongoose.model('Audit');
  let audit = await Audit.findById(this.auditId);
  return audit.active ? true : false;
});

/* RETURN IF AUDIT IS ACTIVE AND ISMEMBER */
ScheduleSchema.virtual('active').get(async function() {
  const Audit = mongoose.model('Audit');
  let audit = await Audit.findById(this.auditId);
  return (audit.active && this.joinHistory[this.joinHistory.length -1].isMember) ? true : false;
});

/* MIDDLEWARE LOCKSDOWN USER AND INACTIVATES ACTIVE SCHEDULE ON SIXTH EFFEDCTIVE SCHEDULE SAVE */
ScheduleSchema.pre('save', function(next) {
const User = mongoose.model('User');
const Schedule = mongoose.model('Schedule');
User.findById(this.userId)
  .then((user) => {
    if (user.scheduleCount <= 4) {
      next()
    } // deactivate schedules and flag user/deactivate account 
    else {
      // user.schedule.forEach((sched) => { // refactor with loop so can break after one
      //   Schedule.findById(sched)
      //     .then(async (schedObj) => {
      //       console.log('beingcalled in foreach', await schedObj.active)
      //       let schedActive = await schedObj.active;
      //       console.log('beingcalled in foreach after pop ACTIVE', schedActive)
      //       if (await schedObj.active) { 
      //         schedObj.joinHistory.push({
      //           isMember: false,
      //           selfInitiated: false,
      //           joiningUserId: '5a3047c071b36b39cfce6640',//globals.admin,
      //           date: Date.now(),
      //         });
      //       }
      //     })
      // })
      user.status = 'lockdown';
      user.save();
      next();
    }
  })
})

/* MIDDLEWARE ADD SCHEDULE TO ARRAY ON USER */
ScheduleSchema.post('save', function(doc, next) {
  const User = mongoose.model('User');
  User.findById(this.userId)
  .then((user) => {
    user.schedule.push(doc._id);
    user.save()
    .then(() => {
      next()
    })
  })
  .catch((e) => {
    console.error(e);
  })
})

module.exports = mongoose.model('Schedule', ScheduleSchema);


