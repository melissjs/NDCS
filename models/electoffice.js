const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ElectofficeSchema = new Schema({
  election: { type: Schema.Types.ObjectId, ref: 'Election', required: [true, 'Election required'] },
  office: { type: String, required: [true, 'Office required'] },
  mandatory: { type: Boolean, required: [true, 'Mandatory required'] },
});

// finds total votes for this election/office
ElectofficeSchema.virtual('totalVotes').get(async function() {
  const Officevote = require('./officevote');
  return await Officevote.find({ electOfficeId: this._id }).count({}, function(err, count){
    return count;
  })
})

module.exports = mongoose.model('Electoffice', ElectofficeSchema);