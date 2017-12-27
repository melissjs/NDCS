const User = require('../models/user');
// const Electoffice = require('../models/electoffice');
const Officevote = require('../models/officevote');
const assert = require('assert');
const THM = require('./test-helper-methods');

describe('Virtual types (records calculated but not saved in db)', () => {

  it('users scheduleCount returns number of scheduled audits', (done) => {
    const thisVolunteer = new User(THM.userObj);
    thisVolunteer.schedule.push({
      pollingStationId: '5a3047c071b36b39cfce6640',
      electionId: '5a3047c071b36b39cfce6640',
      shifts: [1,2,3]
    })
    thisVolunteer.save()
      .then(() => User.findOne({ firstName: 'thisVolunteerFirstName' }))
      .then((volunteer) => {
        assert(volunteer.scheduleCount === 2)
        done();
      })
  });

  it('officeVote totalVotes returns number of total votes for electOffice', (done) => {
    const thisElectOffice = new Electoffice(THM.electOfficeObj);
    const thisOfficeVote1 = new Officevote(THM.officeVoteObj1);
    const thisOfficeVote2 = new Officevote(THM.officeVoteObj2);
    // Promise.all([thisElectOffice.save(), thisOfficeVote1.save(), thisOfficeVote2.save()])
    //   .then(() => { 
    //     Promise.all([thisOfficeVote1.update({ electOfficeId: thisElectOffice._id }), thisOfficeVote2.update({ electOfficeId: thisElectOffice._id })])
    //     .then(() => {
    //       console.log('OFFICEVOTE1', thisOfficeVote1)
    //       console.log('ELECTOFFICE', thisElectOffice)
    //       assert(thisElectOffice.totalVotes === 2)
    //       done();
    //     })
    //   })
  });

})