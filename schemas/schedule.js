var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function ShiftValidator(shiftArray) {
	return shiftArray.every((shift)=>{
    return (shift>0 && shift<7)  
  })
}

const ScheduleSchema = new Schema({
  pollingStationId: {type: Schema.Types.ObjectId, required: true, ref: 'Pollingstation'},
  electionId: {type: Schema.Types.ObjectId, required: true, ref: 'Election'},
  shifts: {type: [Number], validate: {validator: ShiftValidator, message: 'Invalid shift options'}}
});

module.exports = ScheduleSchema;