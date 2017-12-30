const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let roles = ['user', 'volunteer', 'lead', 'admin'];
function roleValidator(roleArray) {
  return roleArray.every((role)=>{
    return (roles.includes(role))  
  })
};

const UserRoleSchema = new Schema({
  role: { type: String, required: [true, 'PollingStationId required'], validate: {validator: roleValidator, message: 'Invalid role option' } },
  dateInitiated: { type: [Date], required: [true, 'Role initiation date required'] },
  dateApproved: { type: [Date]},
  dateRemoved: { type: [Date] }
});

module.exports = UserRoleSchema;