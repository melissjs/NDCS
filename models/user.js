var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ScheduleSchema = require('../schemas/schedule');
const TimesheetSchema = require('../schemas/timesheet');
var mongooseUniqueValidator = require('mongoose-unique-validator');

let roles = ['user', 'volunteer', 'lead', 'admin']

function roleValidator(roleArray) {
  return roleArray.every((role)=>{
    return (roles.includes(role))  
  })
}

var userSchema = new Schema({
  username: { type: String, required: true, unique: true, uniqueCaseInsensitive: true },
  password: { type: String, required: true },
  volunteerRoles: {type: [String], required: true, validate: {validator: roleValidator, message: "Role does not exist"}},
  firstName: {type: String, required: [true, 'First name is required'], minlength: [2, 'First name must be at least two characters']},
  lastName: {type: String, required: [true, 'Last name is required'], minlength: [2, 'Last name must be at least two characters']},
  emailAddress: {type: String, lowercase: true, unique: true, uniqueCaseInsensitive: true, trim: true, required: [true, 'Email is required']},
  exposeEmail: {type: Boolean, required: true},
  phoneNumber: {type: String, required: true, unique: true, uniqueCaseInsensitive: true},
  age: {type: Number, required: true},
  sex: {type: String, required: true},
  partyAffiliation: {type: String, required: true},
  schedule: [ScheduleSchema],
  timeSheet: {type: [TimesheetSchema], required: function() { return this.volunteerRoles.includes('volunteer') }},
});

userSchema.virtual('scheduleCount').get(function() {
  return this.schedule.length;
})

userSchema.plugin(mongooseUniqueValidator, { message: '{PATH} must be unique, please enter another' });

module.exports = mongoose.model('User', userSchema);