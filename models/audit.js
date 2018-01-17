const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function ShiftValidator(shiftArray) {
	return shiftArray.every((shift)=>{
    return (shift>0 && shift<7)  
  })
}

const AuditSchema = new Schema({
  pollingStationId: { type: Schema.Types.ObjectId, ref: 'Pollingstation', required: [true, 'PollingStationId required'] },
  electionId: { type: Schema.Types.ObjectId, ref: 'Election', required: [true, 'ElectionId required'] },
  operative: { type: Boolean, default: true }
});

AuditSchema.virtual('active').get(async function() {
  let election = await election.findById()
  return (election.active && this.operative) ? true : false;
});

// finds total votes for this election/office
AuditSchema.virtual('team').get(async function() {
  const Schedule = require('./schedule');
  const team = [];
  try {
    const teamSchedules = await Schedule.find({ 
      auditId: this._id,
    })
    teamSchedules.forEach((sched) => {
      team.push(sched.userId);
    })
    return team;
  }
  catch(e) {
    return e;
  }
})

module.exports = mongoose.model('Audit', AuditSchema);

