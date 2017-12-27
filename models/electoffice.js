const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Officevote = require('../models/officevote');

const electofficeSchema = new Schema({
  election: { type: Schema.Types.ObjectId, ref: 'Election', required: [true, 'Election required'] },
  office: { type: String, required: [true, 'Office required'] },
  mandatory: { type: Boolean, required: [true, 'Mandatory required'] },
});

electofficeSchema.virtual('totalVotes').get(async function() {
  return await Officevote.find({ electOfficeId: this._id }).count({}, function(err, count){
    return count;
  })
})

// function rankedRequired() {
//   Electoffice.find()
//   .distinct(this.electOfficeId)
//   .count(function (err, count) {
//       //The number of unique users is 'count'
//       console.log('COUNT', count);
//       return true;
//   });
// }

module.exports = mongoose.model('Electoffice', electofficeSchema);