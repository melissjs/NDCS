  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  
  var anomalySchema = new Schema({
    // id is created automatically
    volunteerKey: String,
    nature: String,
    fullName: String,
    emailAddress: String,
    comments: String,
    evidence: Boolean
  });
  
  module.exports = mongoose.model('Anomaly', anomalySchema);