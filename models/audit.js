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

/* RETURNS AUDIT TEAM */
AuditSchema.methods.getTeam = async function getTeam () {
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
};

/* RETURNS NUMBER OF SHIFTS FILLED */
AuditSchema.methods.getShiftsFilled = async function getShiftsFilled () {
  const User = require('./user');
  const Schedule = require('./schedule');
  let aggShifts = 0;
  let activeSched;
  async function addShifts(user) {
    activeSched = await user.activeSchedule();
    aggShifts += activeSched.shifts.length;
  };
  let team = await this.getTeam();
  team.forEach((user) => {
    mongoose.Types.ObjectId(user)
  })
  let users = await User.find({ '_id': team });
  for (i = 0; i < users.length; i++) {
    addShifts(users[i]);
    if (i === users.length - 1) {
      console.log('aggShifts', aggShifts)
      return aggShifts;
    }
  }
};

/* RETURNS ACTIVE BOOLEAN */
AuditSchema.methods.active = async function active () {
  const Election = require('./election');
  const Pollingstation = require('./pollingstation');
  try {
    const [election, pollingstation] = await Promise.all([
      Election.findById(this.electionId),
      Pollingstation.findById(this.pollingStationId)
    ]);
    return election.active && pollingstation.operative
  }
  catch (e) {
    console.error('Error [AuditSchema]:', e )
  }
};

module.exports = mongoose.model('Audit', AuditSchema);

