const User = require('../models/user');
const Election = require('../models/election');
const Pollingstation = require('../models/pollingstation');
const Evidence = require('../models/evidence');
const Anomaly = require('../models/anomaly');
const Schedule = require('../models/schedule')
const Vote = require('../models/vote');
const assert = require('assert');
const THM = require('./test-helper-methods');

describe.only('Associations', () => {
  let thisUser, thisVolunteer, thisElection, thisPollingStation;

  beforeEach((done) => {
    thisUser = new User(THM.userObj);
    thisElection = new Election(THM.electionObj);
    thisPreviousElection = new Election(THM.previousElectionObj);
    thisPollingStation = new Pollingstation(THM.pollingstationObj)
    thisElection.previousElection = thisPreviousElection;
    thisSchedule = new Schedule(THM.scheduleObj);
    thisSchedule.pollingStationId = thisPollingStation;
    thisSchedule.electionId = thisElection;
    // console.log('SCEHDHHDHD', thisSchedule)
    thisSchedule.shifts = [1, 2];
    thisUser.schedule.push(thisSchedule);
    // console.log(thisUser)
    Promise.all([thisUser.save(), thisPollingStation.save(), thisElection.save(), thisPreviousElection.save(), thisSchedule.save()])
    .then(() => done());
  });

  it.only('Saves relation between user and schedule', (done) => {
    User.findOne({ firstName: 'thisVolunteerFirstName' })
    .populate('schedule')
    .then((user) => {
      assert(user.schedule[0].shifts.length  === 2)
      done();
    })
  })

  it('Saves a full relation graph', (done) => {
    User.findOne({ firstName: 'thisVolunteerFirstName' })
      .populate('schedule.pollingStationId')
      .populate({
        path: 'schedule.electionId',
        model: 'Election',
        populate: { 
          path: 'previousElection',
          model: 'Election'
        }
      })
      .then((user) => {
        assert(user.schedule[0].pollingStationId.zip === 11111);
        assert(user.schedule[0].electionId.previousElection.electionTitle === 'thisPreviousElectionTitle');
        done();
      })
  })

  // create evidence and anom
  // set anom obj id = 5a3047c071b36b39cfce1122
  // check in fact anom

  it('Saves a conditional reference', (done) => {
    let anomEvidence = new Evidence(THM.evidenceObj);
    let anomRecord = new Anomaly(THM.anomalyObj);
    anomRecord.set('_id', '5a3047c071b36b39cfce1122');
    Promise.all([anomRecord.save(), anomEvidence.save()]).then(() => {
      Evidence.findOne({ _id: anomEvidence._id })
      .populate('anomalyId')
      .then((ev) => {
        assert(ev.anomalyId.nature === 'thisNature');
        done();
      })
    })
  })

})


