const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ScheduleSchema = require('../schemas/schedule');
const UserRoleSchema = require('../schemas/userrole');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  username: { type: String, required: [true, 'Username required'], unique: true, uniqueCaseInsensitive: true },
  password: { type: String, required: [true, 'Password required'] },
  userRoles: { type: [UserRoleSchema], required: [true, 'At least one role is required']},
  firstName: { type: String, required: [true, 'First name required'], minlength: [2, 'First name must be at least two characters'] },
  lastName: { type: String, required: [true, 'Last name required'], minlength: [2, 'Last name must be at least two characters'] },
  emailAddress: { type: String, required: [true, 'Email required'], trim: true, lowercase: true, unique: true, uniqueCaseInsensitive: true },
  exposeEmail: { type: Boolean, required: [true, 'exposeEmail required'] },
  phoneNumber: {  type: Number, minlength: [10, 'Phone number must be 10 characters'],  maxlength: [10, 'Phone number must be 10 characters'], required: [true, 'Phone number required'], unique: true },
  age: { type: Number, required: [true, 'Age required']},
  sex: { type: String, required: [true, 'Sex required'] },
  partyAffiliation: { type: String, required: [true, 'Party affiliation required'] },
  schedule: [ScheduleSchema]
});

userSchema.virtual('scheduleCount').get(function() {
  return this.schedule.length;
});

userSchema.plugin(mongooseUniqueValidator, { message: '{PATH} must be unique, please enter another' });

module.exports = mongoose.model('User', userSchema);