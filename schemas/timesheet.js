const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimesheetSchema = new Schema({
  roleInOrOut: { type: String, enum: { values: ['volunteerRoleInitiated', 'in', 'out'], message: 'Invalid selection' }, required: [true, 'RoleInOrOut required'] },
  location: { type: { type: String, default: 'Point' }, coordinates: [], required: [true, 'Location required'] },
  authenticatingVolunteerId: {type: [Schema.Types.ObjectId], ref: 'User', required: [function() { return this.inOrOut === 'in' || this.inOrOut === 'volunteerRoleInitiated' }, 'AthenticatingVolunteerId required for check in and volunteer role approval'] },
  electionId: { type: Schema.Types.ObjectId, ref: 'Election', required: [true, 'ElectionId required'] },
});

module.exports = TimesheetSchema;