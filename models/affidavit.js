    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    
    var affidavitSchema = new Schema({
      userId: {type: [Schema.Types.ObjectId], ref: 'User'},
      firstName: {type: String, required: [true, 'First name is required'], minlength: [2, 'First name must be at least two characters']},
      lastName: {type: String, required: [true, 'Last name is required'], minlength: [2, 'Last name must be at least two characters']},
      consent: { type: Boolean, required: true },
      streetAddress: { type: String, required: true },
      zip: Number,
      comments: String,
      emailAddress: {type: String, lowercase: true, trim: true},
      timestamp: { type: Date, default: Date.now }
    });
    
    module.exports = mongoose.model('Affidavit', affidavitSchema);