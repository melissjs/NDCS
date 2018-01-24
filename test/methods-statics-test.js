const User = require('../models/user');
const Officevote = require('../models/officevote');
const Electoffice = require('../models/electoffice');
const Schedule = require('../models/schedule');
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

  it.only('officeVote candidateVoteCount statistic returns total for given electOffice and candidate', (done) => {
    const thisElectOffice = new Electoffice(THM.electOfficeObj);
    thisElectOffice.save().then(() => {
      const thisOfficeVote1 = new Officevote(THM.officeVoteObj1);
      thisOfficeVote1.set('electOfficeId', thisElectOffice._id);
      const thisOfficeVote2 = new Officevote(THM.officeVoteObj2);
      thisOfficeVote2.set('electOfficeId', thisElectOffice._id);
      const thisOfficeVote3 = new Officevote(THM.officeVoteObj3);
      thisOfficeVote3.set('electOfficeId', thisElectOffice._id);
      Promise.all([thisOfficeVote1.save(), thisOfficeVote2.save(), thisOfficeVote3.save()])
        .then(() => {
          Officevote.candidateVoteCount(thisElectOffice._id, thisOfficeVote3.candidateId, function(err, res) { 
            assert(res  === 1 )
            done()
          })
        })
    });
  })


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