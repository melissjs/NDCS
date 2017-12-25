  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  
  var demographicsSchema = new Schema({
    voteId: {type: [Schema.Types.ObjectId], ref: 'Vote'},
    userId: {type: [Schema.Types.ObjectId], ref: 'User'},
    sex: String,
    age: String,
    ethnicity: String,
    partyAffiliation: String,
    annualIncome: String,
    education: String,
    maritalStatus: String,
    naturalizedCitizen: Boolean,
    countryOfOrigin: String,
    firstTimeVoter: Boolean,
    ttimestamp: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Demographics', demographicsSchema);