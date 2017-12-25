var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var amendmentSchema = new Schema({
  voteId: {type: [Schema.Types.ObjectId], ref: 'Vote'},
  userId: {type: [Schema.Types.ObjectId], ref: 'User'},
  incorrectSelection: String,
  correctSelection: String,
  authenticatedByKey: {type: [Schema.Types.ObjectId], ref: 'User'},
  timestamp: { type: Date, default: Date.now }  
});

module.exports = mongoose.model('Amendment', amendmentSchema);

