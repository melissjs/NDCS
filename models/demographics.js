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
    voteId: {type: [Schema.Types.ObjectId], ref: 'Vote',  required: [true, 'VoteId required']},
    volunteerId: {type: [Schema.Types.ObjectId], ref: 'User',  required: [true, 'VolunteerId required']},
    timestamp: { type: Date, default: Date.now,  required: [true, 'Timestamp required'] }
  });
  
  module.exports = mongoose.model('Demographics', demographicsSchema);