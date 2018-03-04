const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleRequestApplicationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'UserId required'] },
  roleRequests: { type: [RoleRequestSchema] },
  preferredContact:{ type: String, required: [true, 'Preferred contact required'] },
  references: { type: String },
  facebook: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
  website: { type: String },
  resume: { type: String },
  areasOfExpertise: { type: String },
  relatedExperience: { type: String },
  otherLinks: { type: String }
});

module.exports = mongoose.model('Rolerequest', RoleRequestApplicationSchema);

// redundant if id ref on user model?
// update instead of overwrite changes for security reasons?