  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  
  var demographicsSchema = new Schema({
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
    voteId: {type: [Schema.Types.ObjectId], ref: 'Vote'},
    volunteerId: {type: [Schema.Types.ObjectId], ref: 'User'},
    timestamp: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Demographics', demographicsSchema);