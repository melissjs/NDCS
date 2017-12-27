const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VotesuccessSchema = new Schema({
  election: { type: Schema.Types.ObjectId, ref: 'Election', required: [true, 'Elecion required'] },
  Success: { type: Boolean, required: [true, 'Success required'] },
  couldNotVoteReason: { type: String, enum: { values: ['registrationIncorrectlyChanged', 'notRegisteredInTime', 'nameNotOnRole', 'incorrectVBM', 'noPollingLocationAccess', 'noTimeOff', 'inaccessableLocation', 'other'], message: 'Invalid reason' }, required: [true, 'Reason required']},
  couldNotVoteReasonOtherWriteIn: { type: String, required: [function() {return this.couldNotVoteReason === 'other'}, 'Other reason required'] },
  castBy: { type: String, enum: { values: ['votingMachine', 'voteByMail', 'absentee', 'provisional', 'paperBallot', 'dontRemember'], message: 'Invalid cast by option' }, required: [true, 'CastBy required']}
});

module.exports = VotesuccessSchema;
