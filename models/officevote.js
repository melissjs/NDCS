var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var officevoteSchema = new Schema({
  voteId: { type: [Schema.Types.ObjectId], ref: 'User' },
  electOfficeId: { type: Schema.Types.ObjectId, ref: 'Electoffice' },
  candidateId:{ type: Schema.Types.ObjectId, ref: 'Candidate' },
  levelOfSupport: { type: String, enum: {values: ['Highly', 'Moderately', 'Dislike'], message: 'Invalid LOS' }},
  rankedVotes: { type: [Schema.Types.ObjectId], ref: 'Rankedvote' }
});

officevoteSchema.virtual('totalVotes').get(function() {
  let total;
  Officevote.count({}, function(err, count){
    total = count;
  })
  return total;
})

// get total vote, non vote, provisional, outside records
// get each of the above for each candidate

// officevoteSchema.virtual('electionResults').get(function() {
//   let total = officevoteSchema.count({});
//   let
//   // return this.schedule.length;
// })

module.exports = mongoose.model('Officevote', officevoteSchema);