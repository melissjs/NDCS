var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ScheduleSchema = require('../schemas/schedule');
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
  emailAddress: {type: String, required: true, lowercase: true, unique: true, uniqueCaseInsensitive: true},
  exposeEmail: {type: Boolean, required: true},
  phoneNumber: {type: String, required: true, unique: true, uniqueCaseInsensitive: true},
  age: {type: Number, required: true},
  sex: {type: String, required: true},
  partyAffiliation: {type: String, required: true},
  schedule: [ScheduleSchema]
});

userSchema.virtual('scheduleCount').get(function() {
  return this.schedule.length;
})

userSchema.plugin(mongooseUniqueValidator, { message: '{PATH} must be unique, please enter another {PATH}' });

module.exports = mongoose.model('User', userSchema);