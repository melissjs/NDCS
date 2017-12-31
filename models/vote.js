  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  const VotesuccessSchema = require('../schemas/votesuccess');

  const voteSchema = new Schema({
    voteSuccessDetails: [VotesuccessSchema],
    samePreviousVotePollingLocation: { type: String, enum: { values: ['yes', 'no', 'dontRemember'], message: 'Invalid previous polling location option' } },
    officeVotes: { type: [Schema.Types.ObjectId], ref: 'Officevote' },
    // PreviousOfficeVotes: { type: [Schema.Types.ObjectId], ref: 'Officevote' },
    volunteerId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'VolunteerId required'] },
    electionId: { type: Schema.Types.ObjectId, ref: 'Election', required: [true, 'ElectionId required'] },
    timestamp: { type: Date, default: Date.now, required: [true, 'Timestamp required'] }
  });
  
  module.exports = mongoose.model('Vote', voteSchema);