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

  // it.only('officeVote candidateVoteCount statistic returns total for given electOffice and candidate', (done) => {
  //   const thisElectOffice = new Electoffice(THM.electOfficeObj);
  //   thisElectOffice.save().then(() => {
  //     const thisOfficeVote1 = new Officevote(THM.officeVoteObj1);
  //     thisOfficeVote1.set('electOfficeId', thisElectOffice._id);
  //     const thisOfficeVote2 = new Officevote(THM.officeVoteObj2);
  //     thisOfficeVote2.set('electOfficeId', thisElectOffice._id);
  //     const thisOfficeVote3 = new Officevote(THM.officeVoteObj3);
  //     thisOfficeVote3.set('electOfficeId', thisElectOffice._id);
  //     Promise.all([thisOfficeVote1.save(), thisOfficeVote2.save(), thisOfficeVote3.save()])
  //       .then(async () => {
  //         assert(await Officevote.candidateVoteCount(thisElectOffice._id, thisOfficeVote3.candidateId) === 1)
  //         done();
  //       })
  //   });
  // })

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
          Officevote.candidateVoteCount(thisElectOffice._id, thisOfficeVote3.candidateId, function(err, res) { 
            assert(res  === 1 )
            done()
          })
        })
    });
  });

  // it('users effectiveSchedules returns effective schedues', (done) => {
  //   const thisVolunteer = new User(THM.userESObj);
  //   const thisPastElection = new Election(THM.electionPastObj);
  //   const thisPresentElection = new Election(THM.electionPresentObj);
  //   const thisNonOpPollingStation = new Pollingstation(THM.pollingstationNonOperativeObj);
  //   const thisOpPollingStation1 = new Pollingstation(THM.pollingstationOperative1Obj);
  //   const thisOpPollingStation2 = new Pollingstation(THM.pollingstationOperative2Obj);
  //   const thisSchedule1 = new Schedule(THM.scheduleOneObj);
  //   const thisSchedule2 = new Schedule(THM.scheduleTwoObj);
  //   const thisSchedule3 = new Schedule(THM.scheduleThreeObj);
  //   const thisSchedule4 = new Schedule(THM.scheduleFourObj);
  //   const thisOldAudit = new Audit({
  //     electionId: thisPastElection._id,
  //     pollingStationId: thisOpPollingStation1._id
  //   });
  //   const thisInOpAudit = new Audit({
  //     electionId: thisPresentElection._id,
  //     pollingStationId: thisNonOpPollingStation._id
  //   });
  //   const thisOp1Audit = new Audit({
  //     electionId: thisPresentElection._id,
  //     pollingStationId: thisOpPollingStation1._id
  //   });
  //   const thisOp2Audit = new Audit({
  //     electionId: thisPresentElection._id,
  //     pollingStationId: thisOpPollingStation2._id
  //   });
  //   thisSchedule1.userId = thisVolunteer._id;
  //   thisSchedule1.auditId = thisInOpAudit._id;
  //   thisSchedule2.userId = thisVolunteer._id;
  //   thisSchedule2.auditId = thisOldAudit._id;
  //   thisSchedule3.userId = thisVolunteer._id;
  //   thisSchedule3.auditId = thisOp1Audit._id;
  //   thisSchedule4.userId = thisVolunteer._id;
  //   thisSchedule4.auditId = thisOp2Audit._id;
  //   thisVolunteer.save()
  //     .then(() => {
  //       Promise.all([thisSchedule1.save(), thisSchedule2.save(), thisSchedule3.save(), thisSchedule4.save(), thisPastElection.save(), thisPresentElection.save(), thisNonOpPollingStation.save(), thisOpPollingStation1.save(), thisOpPollingStation2.save(), thisOldAudit.save(), thisInOpAudit.save(), thisOp1Audit.save(), thisOp2Audit.save()])
  //       .then(() => User.findOne({ firstName: 'thisVolunteerFirstName' }))
  //       .then(async (volunteer) => {
  //         // console.log('SCHED COUNT', volunteer )
  //         // console.log('SCHED AWAITED', await volunteer.effectiveSchedules )
  //         assert(await volunteer.effectiveSchedules.length === 2);
  //         done();
  //       })
  //     })
  // });

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
      .then((aud) => {
        aud.active((err, res) => {
          assert(res === false);
          done();
        })
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
            .then((user) => {
              user.schedule[0].effective((err, res) => {
                assert(res === true);
                done();
              })
            })
        })
    })
  });



  // it('schedule currentTeam returns team associated with election/station', (done) => {
  //   const thisSchedule = new Schedule(THM.scheduleObj);
  //   const thisSchedule1 = new Schedule(THM.scheduleObj1);
  //   const thisSchedule2 = new Schedule(THM.scheduleObj2);
  //   const thisSchedule3 = new Schedule(THM.scheduleObj3);
  //   Promise.all([thisSchedule.save(), thisSchedule1.save(), thisSchedule2.save(), thisSchedule3.save()])
  //   .then(async () => {
  //     const teamArr = await Schedule.currentTeam(thisSchedule.electionId, thisSchedule.pollingStationId);
  //     assert(teamArr.length === 3)
  //     done();
  //   })
  // });

})