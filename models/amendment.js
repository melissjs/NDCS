var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var amendmentSchema = new Schema({
  // id is created automatically
  voteRecordKey: String,
  volunteerKey: String,
  incorrectSelection: String,
  correctSelection: String,
  authenticatedByKey: String
});

module.exports = mongoose.model('Amendment', amendmentSchema);

