const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  name: { type: String, required: [true, 'Name required'] },
  party: { type: String, required: [true, 'Party required'] },
  electOffice: { type: [Schema.Types.ObjectId], ref: 'Electoffice', required: [true, 'ElectOffice required']  },
});

candidateSchema.virtual('totalVotes').get(async function() {
  return await Officevote.count({ candidateId: this._id}, function(err, count){
    return count;
  })
})

module.exports = mongoose.model('Candidate', candidateSchema);