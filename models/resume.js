const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RoleRequestSchema = require('../schemas/rolerequest');

const ResumeSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'UserId required'] },
  roleRequests: { type: [RoleRequestSchema] },
  shortBio: { type: String },
  preferredContact: { type: [String], required: [true, 'Preferred contact required'], enum: {values: ['email', 'phone', 'text'], message: 'Invalid preferred contact option' }  },
  references: { type: String },
  facebook: { type: String },
  twitter: { type: String },
  instagram: { type: String },
  linkedin: { type: String },
  website: { type: String },
  resume: { type: String },
  areasOfExpertise: { type: [String], enum: {values: ['activism', 'pr', 'business', 'legal', 'software', 'language', 'education', 'media'], message: 'Invalid area of expertise option' } },
  relatedExperience: { type: String },
  otherLinks: { type: String }
});

module.exports = mongoose.model('Resume', ResumeSchema);

// collaborator form
// redundant if id ref on user model?
// update instead of overwrite changes for security reasons?