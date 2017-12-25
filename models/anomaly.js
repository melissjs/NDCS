  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  
  var anomalySchema = new Schema({
    userId: {type: [Schema.Types.ObjectId], ref: 'User'},
    nature: String,
    fullName: String,
    emailAddress: String,
    comments: String,
    evidence: Boolean,
    images: {type: [Schema.Types.ObjectId], ref: 'Image'},
    timestamp: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Anomaly', anomalySchema);