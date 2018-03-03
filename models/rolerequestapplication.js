const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TimesheetSchema = require('../schemas/timesheet');
const JoinhistorySchema = require('../schemas/joinhistory');

const RoleRequestApplicationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'UserId required'] },
  // roleRequests: rr schema arr
  // questions:
  // preferredContact:,
  // references:,
  // facebook:,
  // twitter:,
  // instagram:,
  // linkedin:,
  // website:
  // resume:,
  // otherLinks:,

});

module.exports = mongoose.model('Rolerequest', RoleRequestApplicationSchema);


// approved to roles?