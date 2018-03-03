const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TimesheetSchema = require('../schemas/timesheet');
const JoinhistorySchema = require('../schemas/joinhistory');

let roles = [ 'volunteer', 'auditor', 'lead', 'admin'];
function rolesValidator(rolesArray) {
  return rolesArray.every((role)=>{
    return (roles.includes(role))  
  })
};

const RolerequestSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'UserId required'] },
  roleRequested: { type: [String], validate: { validator: rolesValidator, message: "Role does not exist" } },
  // reason-role:,
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

module.exports = mongoose.model('Rolerequest', RolerequestSchema);


// approved to roles?