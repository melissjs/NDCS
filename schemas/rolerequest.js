const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleRequestSchema = new Schema({
roleRequested: { type: String, required: [true, 'Role required'], enum: {values:  ['user', 'volunteer', 'auditor', 'watcher', 'lead', 'legalObserver', 'admin'], message: 'Invalid role option' } },
reasons: { type: String, required: [true, 'Role reason required']},
questions: { type: String },
reviewed: { type: Boolean,  default: false, required: [true, 'reviewed required'] }
});

module.exports = RoleRequestSchema;

// update instead of overwrite changes for security reasons?
// approved/denied??