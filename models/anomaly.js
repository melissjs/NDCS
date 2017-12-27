  const mongoose = require('mongoose');
  const Schema = mongoose.Schema;
  
  const anomalySchema = new Schema({
    nature: { type: String, required: [true, 'Description of anomaly required'] },
    firstName: { type: String, required: [true, 'First name is required'], minlength: [2, 'First name must be at least two characters'] },
    lastName: { type: String, required: [true, 'Last name is required'], minlength: [2, 'Last name must be at least two characters'] },
    consentToContact: { type: Boolean, required: [true, 'Consent required'] },
    emailAddress: { type: String, lowercase: true, trim: true },
    comments: String,
    evidence: {type: [Schema.Types.ObjectId], ref: 'Evidence'},
    volunteerId: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'VolunteerId required'] },
    electionId: { type: Schema.Types.ObjectId, ref: 'Election', required: [true, 'ElectionId required'] },
    timestamp: { type: Date, default: Date.now, required: [true, 'Timestamp required'] }
  });
  
  module.exports = mongoose.model('Anomaly', anomalySchema);