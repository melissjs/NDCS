var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
  firstName: {type: String, required: [true, 'First name is required'], minlength: [2, 'First name must be at least two characters']},
  lastName: {type: String, required: [true, 'Last name is required'], minlength: [2, 'Last name must be at least two characters']},
  phoneNumber: String,
  emailAddress: {type: String, lowercase: true, required: [true, 'Email is required']},
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);