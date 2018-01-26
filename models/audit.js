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
});

// /////////// try as method not virtual for async
AuditSchema.methods.active = function active (cb) {
  const Election = mongoose.model('Election');
  const Pollingstation = mongoose.model('Pollingstation');
    Election.findById(this.electionId, (err, election) => {
      Pollingstation.findById(this.pollingStationId, (err, ps) => {
      let res = (election.active && ps.operative);
       cb(err, res);
    })
  })
};



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
    console.error(e);
  }
})

module.exports = mongoose.model('Audit', AuditSchema);

