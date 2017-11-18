    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    
    var affidavitSchema = new Schema({
      // id is created automatically
      //affidavitNumber: string;
      volunteerKey: String,
      fullName: String,
      streetAddress: String,
      zip: Number,
      comments: String,
      emailAddress: String,
      evidence: Boolean
    });
    
    module.exports = mongoose.model('Affidavit', affidavitSchema);