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
      // return result.mandatory;
      console.log('RESULT', result)
      return false;
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



// statistics
officevoteSchema.statics.candidateVoteCount = async function candidateVoteCount (electOfficeId, candidateId){
  return await this.where({ electOfficeId: electOfficeId})
    .find({ candidateId: candidateId })
    .count(function (err, count) {
        return true;
    });
};

// methods

// get total vote, non vote, provisional, outside records
// get each of the above for each candidate



module.exports = mongoose.model('Officevote', officevoteSchema);