const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TimesheetSchema = require('../schemas/timesheet');
const JoinhistorySchema = require('../schemas/joinhistory');

let ethnicities = [ 'volunteer', 'auditor', 'lead', 'admin'];
function rolesValidator(ethnicitiesArray) {
  return ethnicitiesArray.every((ethnicity)=>{
    return (ethnicities.includes(ethnicity))  
  })
};

const RolerequestSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'UserId required'] },
  rolesRequested: { type: [String], validate: { validator: rolesValidator, message: "Role does not exist" } },
  shifts: { type: [Number], validate: {validator: ShiftValidator, message: 'Invalid shift options' } },
  timeSheet: { type: [TimesheetSchema] },
  exitReview: { type: Schema.Types.ObjectId, ref: 'Exitreview' },
  auditorReviews: { type: [Schema.Types.ObjectId], ref: 'Auditorreview' },
});

module.exports = mongoose.model('Rolerequest', RolerequestSchema);


// approved to roles?