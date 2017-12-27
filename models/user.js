const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ScheduleSchema = require('../schemas/schedule');
const TimesheetSchema = require('../schemas/timesheet');
const mongooseUniqueValidator = require('mongoose-unique-validator');

let roles = ['user', 'volunteer', 'lead', 'admin'];
function roleValidator(roleArray) {
  return roleArray.every((role)=>{
    return (roles.includes(role))  
  })
};

const userSchema = new Schema({
  username: { type: String, required: [true, 'Username required'], unique: true, uniqueCaseInsensitive: true },
  password: { type: String, required: [true, 'Password required'] },
  volunteerRoles: { type: [String], required: true, validate: { validator: roleValidator, message: "Role does not exist" } },
  firstName: { type: String, required: [true, 'First name required'], minlength: [2, 'First name must be at least two characters'] },
  lastName: { type: String, required: [true, 'Last name required'], minlength: [2, 'Last name must be at least two characters'] },
  emailAddress: { type: String, required: [true, 'Email required'], trim: true, lowercase: true, unique: true, uniqueCaseInsensitive: true },
  exposeEmail: { type: Boolean, required: [true, 'exposeEmail required'] },
  phoneNumber: {  type: Number, minlength: [10, 'Phone number must be 10 characters'],  maxlength: [10, 'Phone number must be 10 characters'], required: [true, 'Phone number required'], unique: true },
  age: { type: Number, required: [true, 'Age required']},
  sex: { type: String, required: [true, 'Sex required'] },
  partyAffiliation: { type: String, required: [true, 'Party affiliation required'] },
  schedule: [ScheduleSchema],
  timeSheet: { type: [TimesheetSchema], required: [function() { return this.volunteerRoles.includes('volunteer') }, 'Timesheet required for volunteers'] }
});

userSchema.virtual('scheduleCount').get(function() {
  return this.schedule.length;
});

userSchema.plugin(mongooseUniqueValidator, { message: '{PATH} must be unique, please enter another' });

module.exports = mongoose.model('User', userSchema);