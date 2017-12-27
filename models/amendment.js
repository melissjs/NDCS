const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const amendmentSchema = new Schema({
  incorrectSelection: { type: String, required: [true, 'Incorrect selection required'] },
  correctSelection: { type: String, required: [true, 'Correct selection required'] },
  volunteerId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'VolunteerId required'] },
  authenticatingVolunteerId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'authenticatingVolunteerId required']  },
  electionId: { type: Schema.Types.ObjectId, ref: 'Election', required: [true, 'ElectionId required'] },
  timestamp: { type: Date, default: Date.now, required: [true, 'Timestamp required'] }  
});

module.exports = mongoose.model('Amendment', amendmentSchema);

