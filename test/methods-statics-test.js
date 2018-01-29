const User = require('../models/user');
const Officevote = require('../models/officevote');
const Electoffice = require('../models/electoffice');
const Schedule = require('../models/schedule');
const Pollingstation = require('../models/pollingstation');
const Election = require('../models/election');
const Audit = require('../models/audit');
const assert = require('assert');
const THM = require('./test-helper-methods');

describe('Methods and statistics on models', () => {

  it('officeVote candidateVoteCount statistic returns total for given electOffice and candidate', (done) => {
    const thisElectOffice = new Electoffice(THM.electOfficeObj);
    thisElectOffice.save().then(() => {
      const thisOfficeVote1 = new Officevote(THM.officeVoteObj1);
      thisOfficeVote1.set('electOfficeId', thisElectOffice._id);
      const thisOfficeVote2 = new Officevote(THM.officeVoteObj2);
      thisOfficeVote2.set('electOfficeId', thisElectOffice._id);
      const thisOfficeVote3 = new Officevote(THM.officeVoteObj3);
      thisOfficeVote3.set('electOfficeId', thisElectOffice._id);
      Promise.all([thisOfficeVote1.save(), thisOfficeVote2.save(), thisOfficeVote3.save()])
        .then(async () => {
          const voteCount = await Officevote.candidateVoteCount(thisElectOffice._id, thisOfficeVote3.candidateId);
          assert(voteCount  === 1 )
          done()
        })
    });
  });

  it.only('users effectiveSchedules returns effective schedules', (done) => {
    const thisVolunteer = new User(THM.userESObj);
    const thisPastElection = new Election(THM.electionPastObj);
    const thisPresentElection = new Election(THM.electionPresentObj);
    const thisNonOpPollingStation = new Pollingstation(THM.pollingstationNonOperativeObj);
    const thisOpPollingStation1 = new Pollingstation(THM.pollingstationOperative1Obj);
    const thisOpPollingStation2 = new Pollingstation(THM.pollingstationOperative2Obj);
    const thisSchedule1 = new Schedule(THM.scheduleOneObj);
    const thisSchedule2 = new Schedule(THM.scheduleTwoObj);
    const thisSchedule3 = new Schedule(THM.scheduleThreeObj);
    const thisSchedule4 = new Schedule(THM.scheduleFourObj);
    const thisOldAudit = new Audit({
      electionId: thisPastElection._id,
      pollingStationId: thisOpPollingStation1._id
    });
    const thisInOpAudit = new Audit({
      electionId: thisPresentElection._id,
      pollingStationId: thisNonOpPollingStation._id
    });
    const thisOp1Audit = new Audit({
      electionId: thisPresentElection._id,
      pollingStationId: thisOpPollingStation1._id
    });
    const thisOp2Audit = new Audit({
      electionId: thisPresentElection._id,
      pollingStationId: thisOpPollingStation2._id
    });
    thisSchedule1.userId = thisVolunteer._id;
    thisSchedule1.auditId = thisInOpAudit._id;
    thisSchedule2.userId = thisVolunteer._id;
    thisSchedule2.auditId = thisOldAudit._id;
    thisSchedule3.userId = thisVolunteer._id;
    thisSchedule3.auditId = thisOp1Audit._id;
    thisSchedule4.userId = thisVolunteer._id;
    thisSchedule4.auditId = thisOp2Audit._id;
    thisVolunteer.save()
      .then(() => {
        Promise.all([thisSchedule1.save(), thisSchedule2.save(), thisSchedule3.save(), thisSchedule4.save(), thisPastElection.save(), thisPresentElection.save(), thisNonOpPollingStation.save(), thisOpPollingStation1.save(), thisOpPollingStation2.save(), thisOldAudit.save(), thisInOpAudit.save(), thisOp1Audit.save(), thisOp2Audit.save()])
        .then(() => User.findOne({ firstName: 'thisVolunteerFirstName' }))
        .then(async (volunteer) => {
          const effSchedArr = await volunteer.effectiveSchedules();
          assert(effSchedArr.length === 2);
          done();
        })
      })
  });

  it('users activeSchedule returns the active schedule', (done) => {
    const thisVolunteer = new User(THM.userESObj);
    const thisPastElection = new Election(THM.electionPastObj);
    const thisPresentElection = new Election(THM.electionPresentObj);
    const thisNonOpPollingStation = new Pollingstation(THM.pollingstationNonOperativeObj);
    const thisOpPollingStation1 = new Pollingstation(THM.pollingstationOperative1Obj);
    const thisOpPollingStation2 = new Pollingstation(THM.pollingstationOperative2Obj);
    const thisSchedule1 = new Schedule(THM.scheduleOneObj);
    const thisSchedule2 = new Schedule(THM.scheduleTwoObj);
    const thisSchedule3 = new Schedule(THM.scheduleThreeObj);
    const thisSchedule4 = new Schedule(THM.scheduleFourObj);
    const thisOldAudit = new Audit({
      electionId: thisPastElection._id,
      pollingStationId: thisOpPollingStation1._id
    });
    const thisInOpAudit = new Audit({
      electionId: thisPresentElection._id,
      pollingStationId: thisNonOpPollingStation._id
    });
    const thisOp1Audit = new Audit({
      electionId: thisPresentElection._id,
      pollingStationId: thisOpPollingStation1._id
    });
    const thisOp2Audit = new Audit({
      electionId: thisPresentElection._id,
      pollingStationId: thisOpPollingStation2._id
    });
    thisSchedule1.userId = thisVolunteer._id;
    thisSchedule1.auditId = thisInOpAudit._id;
    thisSchedule2.userId = thisVolunteer._id;
    thisSchedule2.joinHistory.push({
      isMember: false,
      selfInitiated: true,
      date: Date.now()
    });
    thisSchedule2.auditId = thisOldAudit._id;
    thisSchedule3.userId = thisVolunteer._id;
    thisSchedule3.auditId = thisOp1Audit._id;
    thisSchedule4.userId = thisVolunteer._id;
    thisSchedule4.auditId = thisOp2Audit._id;
    thisVolunteer.save()
      .then(async () => {
        await thisPastElection.save();
        await thisPresentElection.save();
        await thisNonOpPollingStation.save();
        await thisOpPollingStation1.save()
        await thisOpPollingStation2.save()
        await thisOldAudit.save();
        await thisInOpAudit.save();
        await thisOp1Audit.save();
        await thisOp2Audit.save();
        await thisSchedule1.save();
        await thisSchedule2.save();
        await thisSchedule3.save();
        await thisSchedule4.save();
      })
        .then(() => User.findOne({ firstName: 'thisVolunteerFirstName' }))
        .then(async (volunteer) => {
          let activeSched = await volunteer.activeSchedule();
          assert(activeSched.auditId._id.toString() === thisOp1Audit._id.toString());
          done();
        })
  });

  it('audit active returns false if election is in the past', (done) => {
    const thisElection = new Election(THM.electionPastObj);
    const thisPollingStation = new Pollingstation(THM.pollingstationObj);
    const thisAudit = new Audit({
      electionId: thisElection._id,
      pollingStationId: thisPollingStation._id
    })
    Promise.all([thisElection.save(), thisPollingStation.save(), thisAudit.save()])
    .then(() => {
      Audit.findById(thisAudit._id)
        .then(async (aud) => {
          let isActive = await aud.active();
            assert(isActive === false);
            done();
        })
      })
  });

  it('schedule effective returns true if audit is active', (done) => {
    const thisUser = new User(THM.userESObj);
    const thisElection = new Election(THM.electionPresentObj);
    const thisPollingStation = new Pollingstation(THM.pollingstationObj);
    const thisAudit = new Audit({
      electionId: thisElection._id,
      pollingStationId: thisPollingStation._id
    });
    Promise.all([thisUser.save(), thisElection.save(), thisPollingStation.save(), thisAudit.save()])
    .then(() => {
      const thisSchedule = new Schedule(THM.scheduleOneObj);
      thisSchedule.userId = thisUser._id;
      thisSchedule.auditId = thisAudit._id;
      thisSchedule.save()
        .then(() => {
          User.findById(thisUser._id)
          .populate({
            path: 'schedule',
            model: 'Schedule',
            populate: {
              path: 'auditId',
              model: 'Audit'
            }
          })
            .then(async (user) => {
              const isEffective = await user.schedule[0].effective();
              assert(isEffective === true);
              done();
            })
        })
    })
  });

  it('schedule active returns true if audit is active and joinhistory ismember', (done) => {
    const thisUser = new User(THM.userESObj);
    const thisElection = new Election(THM.electionPresentObj);
    const thisPollingStation = new Pollingstation(THM.pollingstationObj);
    const thisAudit = new Audit({
      electionId: thisElection._id,
      pollingStationId: thisPollingStation._id
    });
    Promise.all([thisUser.save(), thisElection.save(), thisPollingStation.save(), thisAudit.save()])
    .then(() => {
      const thisSchedule = new Schedule(THM.scheduleOneObj);
      thisSchedule.userId = thisUser._id;
      thisSchedule.auditId = thisAudit._id;
      thisSchedule.save()
        .then(() => {
          User.findById(thisUser._id)
          .populate({
            path: 'schedule',
            model: 'Schedule',
            populate: {
              path: 'auditId',
              model: 'Audit'
            }
          })
          .then(async (user) => {
            const schedActive = await user.schedule[0].active();
            assert(schedActive === true);
            done();
          })
        })
    })
  });

})