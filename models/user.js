var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  // id is created automatically
  nameName: String,
  lastName: String,
  phoneNumber: String,
  email: String
});

module.exports = mongoose.model('User', userSchema);