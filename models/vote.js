  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  const VotesuccessSchema = require('../schemas/votesuccess');

  var voteSchema = new Schema({
    voteSuccessDetails: [VotesuccessSchema],
    samePreviousVotePollingLocation: { type: String, enum: { values: ['yes', 'no', 'dontRemember'], message: 'Invalid previous polling location option' }},
    officeVotes: { type: [Schema.Types.ObjectId], ref: 'Officevote' },
    PreviousOfficeVotes: { type: [Schema.Types.ObjectId], ref: 'Officevote' },
    volunteerId: { type: Schema.Types.ObjectId, ref: 'User' },
    electionId: { type: Schema.Types.ObjectId, ref: 'Election', required: [true, 'ElectionId required'] },
    timestamp: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Vote', voteSchema);