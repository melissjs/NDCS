const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  firstName: { type: String, required: [true, 'First name required'], minlength: [2, 'First name must be at least two characters'] },
  lastName: { type: String, required: [true, 'Last name required'], minlength: [2, 'Last name must be at least two characters'] },
  emailAddress: { type: String, lowercase: true, required: [true, 'Email required'] },
  timestamp: { type: Date, default: Date.now, required: [true, 'Timestamp required'] }
});

module.exports = mongoose.model('Contact', contactSchema);