  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  
  var demographicsSchema = new Schema({
    // id is created automatically
    voteRecordKey: String,
    volunteerKey: String,
    sex: String,
    age: String,
    ethnicity: String,
    partyAffiliation: String,
    annualIncome: String,
    education: String,
    maritalStatus: String,
    naturalizedCitizen: Boolean,
    countryOfOrigin: String,
    firstTimeVoter: Boolean
  });
  
  module.exports = mongoose.model('Demographics', demographicsSchema);