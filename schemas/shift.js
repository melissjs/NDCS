var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function ShiftValidator(shiftArray) {
	return shiftArray.every((shift)=>{
    return (shift>0 && shift<7)  
  })
}

const ScheduleSchema = new Schema({
  pollingStationKey: {type: Schema.Types.ObjectId},
  electionId: {type: Schema.Types.ObjectId},
  shift: {type: [Number], validate: {validator: ShiftValidator, message: 'Invalid shift options'}}
});

module.exports = ScheduleSchema;