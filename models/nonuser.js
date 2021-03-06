const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserRoleSchema = require('../schemas/userrole');
const mongooseUniqueValidator = require('mongoose-unique-validator');

function isAuditor(){
  return this.activeRoles.includes('auditor');
}

const nonuserSchema = new Schema({
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
    lockdown: { type: Boolean, default: false },
    active: { type: Boolean, default: true }
  },
  {
    toObject: { virtuals: true }, 
    toJSON: { virtuals: true } 
  }
);

//unjoined, active pollingstation arr


nonuserSchema.virtual('scheduleCount').get(function() {
  return this.schedule.length;
});

nonuserSchema.virtual('activeRoles').get(function() {
  let activeRoles = [];
  this.userRoles.forEach((ur) => {
    ur.active ? activeRoles.push(ur.role) : null;
  });
  return activeRoles;
});

nonuserSchema.plugin(mongooseUniqueValidator, { message: '{PATH} must be unique, please enter another' });

module.exports = mongoose.model('Nonuser', nonuserSchema);