const Schedule = require('../models/schedule');
const User = require('../models/user');
const Election = require('../models/election');
const Pollingstation = require('../models/pollingstation');
const Audit = require('../models/audit');
const assert = require('assert');
const THM = require('./test-helper-methods');

describe('Middleware', () => {
  
  it.only('locksdown user when user saves 6th effective schedule item', (done) => {
    const thisUser = new User(THM.userESObj);
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
    thisSchedule1.userId = thisUser._id;
    thisSchedule1.auditId = thisInOpAudit._id;
    thisSchedule2.userId = thisUser._id;
    thisSchedule2.joinHistory.push({
      isMember: false,
      selfInitiated: true,
      date: Date.now()
    });
    thisSchedule2.auditId = thisOldAudit._id;
    thisSchedule3.userId = thisUser._id;
    thisSchedule3.auditId = thisOp1Audit._id;
    thisSchedule4.userId = thisUser._id;
    thisSchedule4.auditId = thisOp2Audit._id;
    thisUser.save()
      .then(() => {
        Promise.all([thisSchedule1.save(), thisSchedule2.save(), thisSchedule3.save(), thisSchedule4.save(), thisPastElection.save(), thisPresentElection.save(), thisNonOpPollingStation.save(), thisOpPollingStation1.save(), thisOpPollingStation2.save(), thisOldAudit.save(), thisInOpAudit.save(), thisOp1Audit.save(), thisOp2Audit.save()])
        .then(() => {
          // must create new pollingstation and new audit with present election
          const thisOpPollingStation3 = new Pollingstation(THM.pollingstationOperative3Obj);
          const thisOp3Audit = new Audit({
            electionId: thisPresentElection._id,
            pollingStationId: thisOpPollingStation3._id
          });
          const thisSchedule5 = new Schedule(THM.scheduleObj);
          thisSchedule5.userId = thisUser._id;
          thisSchedule5.auditId = thisOp3Audit._id;
          thisSchedule5.save()
          ///////
          .then(() => {
            // must create new pollingstation and new audit with present election
            const thisOpPollingStation4 = new Pollingstation(THM.pollingstationOperative4Obj);
            const thisOp4Audit = new Audit({
              electionId: thisPresentElection._id,
              pollingStationId: thisOpPollingStation4._id
            });
            const thisSchedule6 = new Schedule(THM.scheduleObj);
            thisSchedule6.userId = thisUser._id;
            thisSchedule6.auditId = thisOp4Audit._id;
            thisSchedule6.save()
          .then(() => {
              // console.log('isNew', thisSchedule6.isNew)
              assert(!thisSchedule6.isNew);
            })
              .then(() => {
                User.findById(thisUser._id)
                  .then((user) => {
                    // console.log('status', user.status)
                    assert(user.status === 'lockdown');
                    done();
                  })
              })
              .catch((e) => {
                done(e);
              })
        })
        .catch((e) => {
          done(e);
      })
    })
    .catch((e) => {
      done(e);
    })
  });

  it('pushes scheduleId to user after saving a schedule', (done) => {
    const thisUser = new User(THM.userObj);
    const thisSchedule2 = new Schedule(THM.scheduleObj);
    thisSchedule2.userId = thisUser._id;
    thisUser.save()
      .then(() => {
          thisSchedule2.save()
          .then(() => {
            User.findOne({ '_id': thisUser._id})
              .then((user) => {
                assert(user.schedule.length === 2)
                done();
              })
            })
        })
    });

})