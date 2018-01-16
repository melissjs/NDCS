const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function leadOrAdmin(){
  const User = require('../models/user');
  return User.findById(this.joiningUserId, async function(err, result) {
    if (err) {
      console.error('ERR', err)
      return false;
    } else {
      let ans = (result.activeRoles.includes('admin') || result.activeRoles.includes('lead'));
      console.log('ANS', ans)
      return ans;
    }
  })
}

const JoinhistorySchema = new Schema({
  joinedOrUnjoined: { type: String, enum: { values: ['joined', 'unjoined'], message: 'Invalid join kind' }, required: [true, 'joinKind required'] },
  selfInitiated: { type: Boolean, default: true, required: [true, 'selfInitiated required'] },
  joiningUserId: { type: Schema.Types.ObjectId, ref: 'User', required: [function() { return !selfInitiated }, 'joiningUserId required'], validate: { isAsync: true, validator: leadOrAdmin, message: 'joiningUser requires higher rank' } },
  date: { type: [Date], required: [true, 'Joinhistory date required'] },
});

module.exports = JoinhistorySchema;
