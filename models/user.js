var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator')

var userSchema = new Schema({
  username: {type: String, required: true, unique: true, uniqueCaseInsensitive: true},
  password: {type: String, required: true},
});

userSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('User', userSchema);