var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TimesheetSchema = new Schema({
  roleInOrOut: { type: String, enum: ['volunteerRoleInitiated', 'in', 'out'] },
  location: { type: { type: String, default: 'Point' }, coordinates: [] },
  authenticatingVolunteerId: {type: [Schema.Types.ObjectId], ref: 'User', required: function() { return this.inOrOut === 'in' }},
  electionId: { type: Schema.Types.ObjectId, ref: 'Election', required: [true, 'ElectionId required'] },
});

module.exports = TimesheetSchema;