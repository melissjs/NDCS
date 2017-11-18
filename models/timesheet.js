var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  
  var timesheetSchema = new Schema({
    // id is created automatically
    volunteerKey: String,
    authenticatingVolunteerKey: String,
    checkInTime: String,
    checkOuttime: String,
    geoLocation: String
  });
  
  module.exports = mongoose.model('Timesheet', timesheetSchema);