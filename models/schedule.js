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

/* RETURN IF SCHEDULE IS JOINED */
ScheduleSchema.virtual('isMember').get(function() {
  return this.joinHistory[this.joinHistory.length -1].isMember
});

// /* RETURN IF AUDIT IS ACTIVE */
// ScheduleSchema.methods.effective = function effective (cb) {
//   const Audit = mongoose.model('Audit');
//   return Audit.findById(this.auditId, (err, aud) => {
//     return aud.active((err, res) => {
//       return cb(err, res);
//     })
//   })
// };

/* RETURN IF AUDIT IS ACTIVE */
ScheduleSchema.methods.effective = async function effective () {
  const Audit = mongoose.model('Audit');
  try {
    const aud = await Audit.findById(this.auditId);
    const isActive = await aud.active();
    return isActive;
  }
  catch(e) {
    console.error(e)
  }

};

// /* RETURN IF AUDIT IS ACTIVE AND ISMEMBER */
ScheduleSchema.methods.active = async function active () {
  const Audit = mongoose.model('Audit');
  try {
    const audit = await Audit.findById(this.auditId);
    const auditIsActive = await audit.active();
    return auditIsActive && this.isMember;
  }
  catch (e) {
    console.error('Error [ScheduleSchema]:', e )
  }
};

/* PRESAVE MIDDLEWARE UNJOINS LAST ACTIVE SCHEDULE AND ALSO LOCKSDOWN USER AND INACTIVATES ACTIVE SCHEDULE ON SIXTH **EFFECTIVE** SCHEDULE SAVE */
ScheduleSchema.pre('save', async function(next) { 
  const User = mongoose.model('User');
  let user;
  let activeSched;
  let effectiveSchedArr;
  let exisitingSched;
  try {
    user = await User.findById(this.userId);
    activeSched = await user.activeSchedule();
    effectiveSchedArr = await user.effectiveSchedules();
  }
  catch (e) {
    console.error('Error [ScheduleSchema]:', e )
  }
// find out if user has a schedule with this auditId already, if yes, ammend that schedule, *update* and return without next ////////// GOES IN MIDDLEWARE FOR ROUTE
  // user.schedule.forEach((sched) => {
  //   (sched.auditId === this.auditId) ? exisitingSched = sched : null ;
  // })
  // if (exisitingSched) { // how to deal with this if its active or not?
  //   exisitingSched.joinHistory.push({
  //     isMember: true,
  //     selfInitiated: true,
  //     date: Date.now(),
  //   });
  // }
  if (!activeSched && effectiveSchedArr.length <= 4) {
    return next();
  } 
  else if (!activeSched && effectiveSchedArr.length > 4) {
    user.update({ status: 'lockdown' })
    .then(() => {
      next();
    })
  }
  else if (activeSched && user.scheduleCount <= 4) {
    activeSched.joinHistory.push({
      isMember: false,
      selfInitiated: true,
      date: Date.now(),
    });
    user.save();
    return next()
  }
  else if (activeSched && user.scheduleCount > 4) {
    activeSched.joinHistory.push({
      isMember: false,
      selfInitiated: false,
      joiningUserId: '5a3047c071b36b39cfce6640',//globals.admin,
      date: Date.now(),
    });
    user.update({ status: 'lockdown' })
    .then(() => {
      next();
    })
  }
})

/* MIDDLEWARE ADD SCHEDULE TO ARRAY ON USER */
ScheduleSchema.post('save', function(doc, next) {
  const User = mongoose.model('User');
  User.findById(this.userId)
  .then((user) => {
    let newSched = user.schedule.slice(0);
    newSched.push(doc._id);
    user.update({ schedule: newSched })
    .then(() => {
      next()
    })
  })
  .catch((e) => {
    console.error(e);
  })
})

module.exports = mongoose.model('Schedule', ScheduleSchema);


