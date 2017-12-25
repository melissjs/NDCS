var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var amendmentSchema = new Schema({
  incorrectSelection: { type: String, required: [true, 'Incorrect selection required'] },
  correctSelection: { type: String, required: [true, 'Correct selection required'] },
  volunteerId: { type: Schema.Types.ObjectId, ref: 'User' },
  authenticatingVolunteerId: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now }  
});

module.exports = mongoose.model('Amendment', amendmentSchema);

