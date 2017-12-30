const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AuthSchema = require('./auth');

const UserRoleSchema = new Schema({
  role: { type: String, required: [true, 'Role required'], enum: {values:  ['user', 'volunteer', 'lead', 'admin'], message: 'Invalid role option' } },
  active: { type: Boolean, required: [true, 'Active or inactive required'] },
  dateInitiated: { type: [Date], required: [true, 'Role initiation date required'] },
  dateActivated: { type: [Date]},
  dateInactivated: { type: [Date] },
  auth:  { type: AuthSchema, required: [function() { return this.roleInOrOut != 'User' }, 'AuthenticatingVolunteerId required for check in'] }
});

module.exports = UserRoleSchema;