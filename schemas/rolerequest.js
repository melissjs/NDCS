const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleRequestSchema = new Schema({
roleRequested: { type: String, required: [true, 'Role required'], enum: {values:  ['user', 'volunteer', 'auditor', 'watcher', 'lead', 'legalObserver', 'admin'], message: 'Invalid role option' } },
reasons: { type: String, required: [true, 'Role reason required']},
questions: { type: String },
status: { type: String, required: [true, 'Status required'], default: 'unreviewed', enum: {values:  ['unreviewed', 'approved', 'denied'], message: 'Invalid role option' } },
});

module.exports = RoleRequestSchema;

// update instead of overwrite changes for security reasons?
// approved/denied??