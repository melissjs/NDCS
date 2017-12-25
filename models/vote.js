  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  
  var voteSchema = new Schema({
    userId: {type: [Schema.Types.ObjectId], ref: 'User'},
    generalSuccess: Boolean,
    generalCouldNotVoteReason: String,
    generalCastBy: String,
    primarySuccess: Boolean,
    primaryCouldNotVoteReason: String,
    primaryCastBy: String,
    primaryVotePollingLocation: String,
    presFirst: String,
    presSecond: String,
    presThird: String,
    timestamp: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Vote', voteSchema);