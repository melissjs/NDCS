    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    
    var affidavitSchema = new Schema({
      firstName: { type: String, required: [true, 'First name is required'], minlength: [2, 'First name must be at least two characters'] },
      lastName: { type: String, required: [true, 'Last name is required'], minlength: [2, 'Last name must be at least two characters'] },
      consent: { type: Boolean, required: true },
      streetAddress: { type: String, required: [true, 'Address is required'] },
      zip: { type: Number, required: [true, 'Zip code is required'] },
      emailAddress: { type: String, lowercase: true, trim: true },
      comments: String,
      volunteerId: { type: [Schema.Types.ObjectId], ref: 'User' },
      timestamp: { type: Date, default: Date.now }
    });
    
    module.exports = mongoose.model('Affidavit', affidavitSchema);