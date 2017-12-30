const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// function authValidator(roleArray) {
// };

const AuthSchema = new Schema({
  // authenticatingUserId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'AuthenticatingUserId required'], validate: { validator: authValidator, message: 'User cannot authenticate self' } },
  authenticatingUserId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'AuthenticatingUserId required'] },
  date: { type: [Date], required: [true, 'Authentication date required'] }
});

module.exports = AuthSchema;