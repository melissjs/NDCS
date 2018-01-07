const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user');
const ScheduleSchema = require('../schemas/schedule');
const globals = require('../globals') ;

const pollingstationSchema = new Schema({
    electionId: { type: [Schema.Types.ObjectId], required: true, ref: 'Election' },
    precinctNumber: String,
    locationName: { type: String, required: [true, 'LocationName required'] },
    streetAddress: { type: String, required: [true, 'Address required'] },
    line1: String,
    line2: String,
    line3: String,
    city: { type: String, required: [true, 'City required'] },
    state: { type: String, required: [true, 'State required'] },
    zip: { type: Number, required: [true, 'Zip code required'] },
    pollingHours: String,
    notes: String
  },
  {
    toObject: { virtuals: true }, 
    toJSON: { virtuals: true } 
  }
);

// returns true or false if this station is known to be used in current election
pollingstationSchema.virtual('currentElection').get(function() {
  return this.electionId[this.electionId.length-1].toString() === globals.CURRENT_ELECTION;
});

// // finds team of users for current election
pollingstationSchema.virtual('currentTeam').get(async function() {
  try {
    console.log(this._id)
  const team = await User.find({ 
    // schedule: {
    //   $in: [{
    //     $eleMatch: {
    //       pollingStationId: this._id,
    //       electionId: globals.CURRENT_ELECTION
    //     }
    //   }]
    // }

    // schedule: {$in: [{ pollingStationId: '5a3047c071b36b39cfce6600' }]}
    // schedule: { pollingStationId: mongoose.Types.ObjectId('5a3047c071b36b39cfce6600') }
    // schedule: { 'pollingStationId':  mongoose.Types.ObjectId('5a3047c071b36b39cfce6600') }
    $and: [
    {'schedule.pollingStationId': this._id},
    {'schedule.electionId': globals.CURRENT_ELECTION}
    ]
  })
  return team;
  }
  catch(e) {
    return e;
  }
})

module.exports = mongoose.model('Pollingstation', pollingstationSchema);

// .then((r) => {console.log('RRRRRRRR', r); return r})
//   .catch((e) => {console.log('EEEEEEEE', e); return e});