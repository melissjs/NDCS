const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RankvoteSchema = require('../schemas/rankvote');
const Electoffice = require('../models/electoffice');

async function rankedRequired() {
  return await Electoffice.find({ _id: this.electOfficeId }, function(err, result) {
    return result.mandatory;
  })
}

const officevoteSchema = new Schema({
  electOfficeId: { type: Schema.Types.ObjectId, ref: 'Electoffice', required: [true, 'ElectOfficeId required'] },
  candidateId: { type: Schema.Types.ObjectId, ref: 'Candidate', required: [true, 'CandidateId required'] },
  levelOfSupport: { type: String, enum: { values: ['highly', 'moderately', 'dislike'], message: 'Invalid LOS' }, required: [true, 'LOS required'] },
  rankedVotes: { type: [RankvoteSchema], required: [rankedRequired, 'AnomalyId required'] },
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