var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const VotesuccessSchema = new Schema({
  election: { type: Schema.Types.ObjectId, ref: 'Election' },
  Success: Boolean,
  couldNotVoteReason: { type: String, enum: { values: ['registrationIncorrectlyChanged', 'notRegisteredInTime', 'nameNotOnRole', 'incorrectVBM', 'noPollingLocationAccess', 'noTimeOff', 'inaccessableLocation', 'other'], message: 'Invalid reason' }},
  couldNotVoteReasonOtherWriteIn: String,
  castBy: { type: String, enum: { values: ['votingMachine', 'voteByMail', 'absentee', 'provisional', 'paperBallot', 'dontRemember'], message: 'Invalid cast by option' }}
});

module.exports = VotesuccessSchema;
