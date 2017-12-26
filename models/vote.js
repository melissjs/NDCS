  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  
  var voteSchema = new Schema({
    Success: Boolean,
    couldNotVoteReason: String,
    castBy: String,
    previousSuccess: Boolean,
    previousCouldNotVoteReason: String,
    previousCastBy: String,
    previousVotePollingLocation: String,
    officeVotes: {type: [Schema.Types.ObjectId], ref: 'Officevote'},
    PreviousOfficeVotes: {type: [Schema.Types.ObjectId], ref: 'Officevote'},
    volunteerId: {type: Schema.Types.ObjectId, ref: 'User'},
    timestamp: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Vote', voteSchema);

  ranked vote
  success 