var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var candidateSchema = new Schema({
  name: String,
  party: String,
  electOffice: { type: [Schema.Types.ObjectId], ref: 'Electoffice' },
});

candidateSchema.virtual('totalVotes').get(function() {
  let total;
  Officevote.count({ candidateId: this._id}, function(err, count){
    total = count;
  })
  return total;
})

module.exports = mongoose.model('Candidate', candidateSchema);