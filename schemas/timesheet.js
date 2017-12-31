const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LocationSchema = require('../schemas/location');
const AuthSchema = require('./auth');

const TimesheetSchema = new Schema({
  inOrOut: { type: String, enum: { values: ['in', 'out'], message: 'Invalid selection' }, required: [true, 'inOrOut required'] },
  location: { type: LocationSchema, required: [true, 'Location required'] },
  date: { type: Date, required: [true, 'Timesheet date required'], default: Date.now() },
  auth: { type: AuthSchema, required: [function() { return this.roleInOrOut === 'in' }, 'AuthenticatingVolunteerId required for check in'] }
});

module.exports = TimesheetSchema;