const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleRequestApplicationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'UserId required'] },
  roleRequests: { type: [RoleRequestSchema] },
  // preferredContact:,
  // references:,
  // facebook:,
  // twitter:,
  // instagram:,
  // linkedin:,
  // website:
  // resume:,
  // otherLinks:,
});

module.exports = mongoose.model('Rolerequest', RoleRequestApplicationSchema);


// approved to roles?
// redundant if id ref on user model?