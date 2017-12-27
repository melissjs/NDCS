const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const affidavitSchema = new Schema({
  firstName: { type: String, required: [true, 'First name required'], minlength: [2, 'First name must be at least two characters'] },
  lastName: { type: String, required: [true, 'Last name required'], minlength: [2, 'Last name must be at least two characters'] },
  consent: { type: Boolean, required: [true, 'Consent required'] },
  streetAddress: { type: String, required: [true, 'Address required'] },
  zip: { type: Number, required: [true, 'Zip code required'] },
  emailAddress: { type: String, lowercase: true, trim: true },
  comments: String,
  volunteerId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'VolunteerId required'] },
  electionId: { type: Schema.Types.ObjectId, ref: 'Election', required: [true, 'ElectionId required'] },
  timestamp: { type: Date, default: Date.now, required: [true, 'Timestamp required'] }
});

module.exports = mongoose.model('Affidavit', affidavitSchema);