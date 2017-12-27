const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RankvoteSchema = require('../schemas/rankvote');

async function rankedRequired() {
  const Electoffice = require('../models/electoffice');
  return await Electoffice.findById(this.electOfficeId, function(err, result) {
    if (err) {
      console.log('ERR', err)
      return false
    } else {
      return result.mandatory;
    }
  })
}

const officevoteSchema = new Schema({
  electOfficeId: { type: Schema.Types.ObjectId, ref: 'Electoffice', required: [true, 'ElectOfficeId required'] },
  candidateId: { type: Schema.Types.ObjectId, ref: 'Candidate', required: [true, 'CandidateId required'] },
  levelOfSupport: { type: String, enum: { values: ['highly', 'moderately', 'dislike'], message: 'Invalid LOS' }, required: [true, 'LOS required'] },
  rankedVotes: { type: [RankvoteSchema], required: [rankedRequired, 'rankedRequired required'] },
  voteId: { type: Schema.Types.ObjectId, ref: 'Vote', required: [true, 'VoteId required'] },
});

// this belongs as middleware - not a property of each record itself
// officevoteSchema.virtual('totalVotes').get(async function() {
//   return await Officevote.count({}, function(err, count){
//     return count;
//   })
// })

// get total vote, non vote, provisional, outside records
// get each of the above for each candidate

module.exports = mongoose.model('Officevote', officevoteSchema);