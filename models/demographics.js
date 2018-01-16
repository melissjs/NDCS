const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ethnicities = ['americanIndian', 'asian', 'black', 'hispanic', 'pacificIslander', 'white', 'other'];
function ethnicitiesValidator(ethnicitiesArray) {
  return ethnicitiesArray.every((ethnicity)=>{
    return (ethnicities.includes(ethnicity))  
  })
};

const demographicsSchema = new Schema({
  sex: { type: String, enum: { values: ['female', 'male', 'noAnswer'], message: 'Sex does not exist' } },
  age: { type: String, enum: { values: ['18-24', '25-34', '35-44', '45-54', '55-54', '55-64', '65+'], message: 'Age range does not exist' } },
  ethnicity: { type: [String], validate: { validator: ethnicitiesValidator, message: "Ethicity does not exist" } },
  writeInOtherEthnicity: String,
  partyAffiliation: { type: String, enum: { values: ['independent', 'noPartyPreference', 'democraticParty', 'greenParty', 'republicanParty', 'otherParty'], message: 'Party does not exist' } },
  writeInOtherParty: String,
  annualIncome: { type: String, enum: { values: ['25k-', '25k-50k', '50k-100k', '100k-250k', '250k-500k', '500k-1M', '1M+'], message: 'Income range does not exist' } },
  education: { type: String, enum: { values: ['highSchool', 'underGraduateSchool', 'graduateSchool', 'postGraduateSchool'], message: 'Education does not exist' } },
  maritalStatus: { type: String, enum: { values: ['unmarried', 'married'], message: 'Marital Status does not exist' } },
  naturalizedCitizen: Boolean,
  countryOfOrigin: String,
  firstTimeVoter: Boolean,
  voteId: { type: Schema.Types.ObjectId, ref: 'Vote',  required: [true, 'VoteId required'] },
  volunteerId: { type: Schema.Types.ObjectId, ref: 'User',  required: [true, 'VolunteerId required'] },
  timestamp: { type: Date, default: Date.now, required: [true, 'Timestamp required'] }
});

module.exports = mongoose.model('Demographics', demographicsSchema);
