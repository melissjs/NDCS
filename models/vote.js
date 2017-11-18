  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  
  var voteSchema = new Schema({
    // id is created automatically
    voteRecordKey: String,
    volunteerKey: String,
    generalSuccess: Boolean,
    generalCouldNotVoteReason: String,
    generalCastBy: String,
    primarySuccess: Boolean,
    primaryCouldNotVoteReason: String,
    primaryCastBy: String,
    primaryVotePollingLocation: String,
    presFirst: String,
    presSecond: String,
    presThird: String
  });
  
  module.exports = mongoose.model('Vote', voteSchema);