var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  // id is created automatically
  username: {type: String, required: true},
  password: {type: String, required: true},
  volunteerKey: {type: Schema.Types.ObjectId, ref: 'Volunteer'}
});

module.exports = mongoose.model('User', userSchema);