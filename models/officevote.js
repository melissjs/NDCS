const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RankvoteSchema = require('../schemas/rankvote');

// async function rankedRequired() {
//   const Electoffice = require('../models/electoffice');
//   return await Electoffice.findById(this.electOfficeId, function(err, result) {
//     if (err) {
//       console.log('ERR', err)
//       return false
//     } else {
//       console.log(result.mandatory)
//       return result.mandatory;;
//     }
//   })
// }

// work around async require issue
function rankedRequired(validateObj) {
  const Electoffice = require('../models/electoffice');
  let ans;
  return Electoffice.findById(this.electOfficeId, function(err, result) {
    if (err) {
      console.log('ERR', err)
      return false
    } else {
      ans = (result.mandatory === true && validateObj.length === 0) ? false : true;
    }
  }).then(() => ans)
}

const officevoteSchema = new Schema({
  electOfficeId: { type: Schema.Types.ObjectId, ref: 'Electoffice', required: [true, 'ElectOfficeId required'] },
  candidateId: { type: Schema.Types.ObjectId, ref: 'Candidate', required: [true, 'CandidateId required'] },
  levelOfSupport: { type: String, enum: { values: ['highly', 'moderately', 'dislike'], message: 'Invalid LOS' }, required: [true, 'LOS required'] },
  // rankedVotes: { type: [RankvoteSchema], required: [rankedRequired, 'rankedRequired required'] },
  rankedVotes: { type: [RankvoteSchema], validate: { isAsync: true, validator: rankedRequired, message: 'rankedRequired required' } },
  voteId: { type: Schema.Types.ObjectId, ref: 'Vote', required: [true, 'VoteId required'] },
});

// get total vote, non vote, provisional, outside records
// get each of the above for each candidate

/* RETURNS ACTIVE BOOLEAN */
officevoteSchema.statics.candidateVoteCount = function candidateVoteCount (electOfficeId, candidateId){
  return this.where({ electOfficeId: electOfficeId})
    .find({ candidateId: candidateId })
    .count()
    .catch((e) => {
      console.error('Error [officevoteSchema]:', e )
    })
};


module.exports = mongoose.model('Officevote', officevoteSchema);