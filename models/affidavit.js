    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    
    var affidavitSchema = new Schema({
      userId: {type: [Schema.Types.ObjectId], ref: 'User'},
      fullName: String,
      consent: { type: Boolean, required: true },
      streetAddress: String,
      zip: Number,
      comments: String,
      emailAddress: {type: String, lowercase: true},
      evidence: Boolean,
      images: {type: [Schema.Types.ObjectId], ref: 'Image'}
    });
    
    module.exports = mongoose.model('Affidavit', affidavitSchema);