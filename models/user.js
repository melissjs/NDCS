const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserRoleSchema = require('../schemas/userrole');
const mongooseUniqueValidator = require('mongoose-unique-validator');

function isAuditor(){
  return this.activeRoles.includes('auditor');
}

const userSchema = new Schema({
    username: { type: String, required: [true, 'Username required'], unique: true, uniqueCaseInsensitive: true, lowercase: true },
    password: { type: String, required: [true, 'Password required'] },
    userRoles: { type: [UserRoleSchema], required: [true, 'At least one role is required']},
    firstName: { type: String, required: [true, 'First name required'], minlength: [2, 'First name must be at least two characters'] },
    lastName: { type: String, required: [true, 'Last name required'], minlength: [2, 'Last name must be at least two characters'] },
    emailAddress: { type: String, required: [true, 'Email required'], trim: true, lowercase: true, unique: true, uniqueCaseInsensitive: true },
    phoneNumber: {  type: Number, minlength: [10, 'Phone number must be 10 characters'],  maxlength: [10, 'Phone number must be 10 characters'], required: [true, 'Phone number required'], unique: true },
    exposeEmail: { type: Boolean, required: [true, 'exposeEmail required'] },
    exposePhoneNumber: { type: Boolean, required: [true, 'exposePhoneNumber required'] },
    age: { type: Number, required: [true, 'Age required']},
    sex: { type: String, required: [true, 'Sex required'], enum: { values: ['male', 'female', 'nonBinary', 'noAnswer'] } },
    partyAffiliation: { type: String, required: [true, 'Party affiliation required'] }, 
    schedule: { type: [{type: Schema.Types.ObjectId, ref: 'Schedule'}], required: [isAuditor, 'Schedule is required for auditors'] },
    status: { type: String, default: 'active', required: [true, 'Status required'], enum: { values: ['active', 'inactive', 'onboarding', 'lockdown', 'deleted'], message: 'Status does not exist' } },
    statusHistory: { type: [String], default: ['onboarding'], required: [true, 'statusHistory required']}
  },
  {
    toObject: { virtuals: true }, 
    toJSON: { virtuals: true } 
  }
);

// what triggers change from onboarding to active?
//if user has multiple schedules (active or not) that are for active elections (over 5) freeze account with lockdown flag
// handle userRole user with active status now... IE if userrole user active && status active

/* RETURN EFFECTIVE SCHEDULES */
// userSchema.virtual('effectiveSchedules').get(async function() {
//   const Schedule = mongoose.model('Schedule');
//   Schedule.find({ _id: { $in: this.schedule } })
//     .then(async (schedArr) => {
//       // console.log('ARRRRR', await schedArr[0].active)
//       let effScheds = [];
//       schedArr.forEach((sched) => {
//         let effectiveBool = sched.effective;
//         // console.log('effectiveBool', effectiveBool)
//         if (effectiveBool === true) {
//           effectiveBool.push(sched);
//         }
//       })
//       // const aggTeam = [].concat( ...await Promise.all(teams));

//       // console.log('EFFSCHEDULES', effScheds)
//       return effScheds;
//     }).then((effScheds) => console.log('EEEEFFFF', effScheds))
// });

/* RETURN EFFECTIVE SCHEDULES */
// userSchema.virtual('effectiveSchedules').get(async function() {
//   const Schedule = mongoose.model('Schedule');
//   let schedObjArr = [];
//   let effSchedObjArr = [];
//   try {
//     let schedObjArr = await Schedule.find({ _id: { $in: this.schedule } });
//     schedObjArr.forEach(async (sched) => {
//     try {
//       let eff = await sched.effective;
//       console.log('EFF', eff);
//       try {
//         console.log('EFF', eff);
//         if (eff === true) {
//           effSchedObjArr.push(sched);
//           // console.log('EFFINSIDE', effSchedObjArr);
//         }
//       }
//       catch(e) {
//         console.error(e)
//       }
//     }
//     catch(e) {
//       console.error(e)
//     }
//   })
//   console.log('effSchedObjArr', await effSchedObjArr)

//   }
//   catch(e) {
//     console.error(e)
//   }
// });

/* RETURN SCHEDULE COUNT */
userSchema.virtual('scheduleCount').get(function() {
  return this.schedule.length;
});

/* RETURN ACTIVE ROLES */
userSchema.virtual('activeRoles').get(function() {
  let activeRoles = [];
  this.userRoles.forEach((ur) => {
    ur.active ? activeRoles.push(ur.role) : null;
  });
  return activeRoles;
});

userSchema.plugin(mongooseUniqueValidator, { message: '{PATH} must be unique, please enter another' });

module.exports = mongoose.model('User', userSchema);