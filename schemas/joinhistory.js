const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function leadOrAdmin(){
  const User = require('../models/user');
  return User.findById(this.joiningUserId, async function(err, result) {
    if (err) {
      console.error('ERR', err)
      return false;
    } else {
      let ans = await (result.activeRoles.includes('admin') || result.activeRoles.includes('lead'));
      console.log('ANS', ans)
      return ans;
    }
  })
}

const JoinhistorySchema = new Schema({
  isMember: { type: Boolean, required: [true, 'IsMember required'] },
  selfInitiated: { type: Boolean, default: true, required: [true, 'selfInitiated required'] },
  joiningUserId: { type: Schema.Types.ObjectId, ref: 'User', required: [function() { return !this.selfInitiated }, 'joiningUserId required'], validate: { isAsync: true, validator: leadOrAdmin, message: 'JoiningUser requires higher rank' } },
  date: { type: Date, default: Date.now(), required: [true, 'Joinhistory date required'] },
});

module.exports = JoinhistorySchema;

