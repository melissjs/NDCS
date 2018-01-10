const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TimesheetSchema = require('../schemas/timesheet');


function ShiftValidator(shiftArray) {
	return shiftArray.every((shift)=>{
    return (shift>0 && shift<7)  
  })
}

const ScheduleSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'UserId required'] },
  pollingStationId: { type: Schema.Types.ObjectId, ref: 'Pollingstation', required: [true, 'PollingStationId required'] },
  electionId: { type: Schema.Types.ObjectId, ref: 'Election', required: [true, 'ElectionId required'] },
  shifts: { type: [Number], validate: {validator: ShiftValidator, message: 'Invalid shift options' } },
  timeSheet: { type: [TimesheetSchema] }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);

