var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  
  var timesheetSchema = new Schema({
    userId: {type: [Schema.Types.ObjectId], ref: 'User'},
    authenticatingVolunteerKey: {type: [Schema.Types.ObjectId], ref: 'User'},
    checkInTime: { type: Date }  ,
    checkOuttime: { type: Date }  ,
    geoLocation: String
  });
  
  module.exports = mongoose.model('Timesheet', timesheetSchema);