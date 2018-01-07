const User = require('../models/user');
const Officevote = require('../models/officevote');
const Electoffice = require('../models/electoffice');
const Pollingstation = require('../models/pollingstation');
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

  it('users activeRoles returns active roles', (done) => {
    const thisVolunteer = new User(THM.userObj);
    thisVolunteer.userRoles.push({
      role: 'admin',
      active: true,
      dateInitiated: [Date.now()],
      dateActivated: [Date.now()],
      dateInactivated: [null],
      auth: {
        authenticatingUserId: '5a3047c071b36b39cfce6640',
        date: Date.now()
      }
    })
    thisVolunteer.save()
      .then(() => User.findOne({ firstName: 'thisVolunteerFirstName' }))
      .then((volunteer) => {
        console.log(volunteer.activeRoles)
        assert(volunteer.activeRoles.length === 3);
        assert(volunteer.activeRoles.includes('user', 'volunteer', 'admin'));
        done();
      })
  });

  it('officeVote totalVotes returns number of total votes for electOffice', (done) => {
    const thisElectOffice = new Electoffice(THM.electOfficeObj);
    thisElectOffice.save().then(() => {
      const thisOfficeVote1 = new Officevote(THM.officeVoteObj1);
      thisOfficeVote1.set('electOfficeId', thisElectOffice._id);
      const thisOfficeVote2 = new Officevote(THM.officeVoteObj2);
      thisOfficeVote2.set('electOfficeId', thisElectOffice._id);
      Promise.all([thisOfficeVote1.save(), thisOfficeVote2.save()])
        .then(async () => {
          assert(await thisElectOffice.totalVotes === 2)
          done();
        })
    });
  });

  it('pollingstation currentElection returns true if used in current election', (done) => {
    const thisPollingstation = new Pollingstation(THM.pollingstationObj);
    thisPollingstation.save()
    .then(() => {
      Pollingstation.findOne({ precinctNumber: 'thisPrecinctNumber' })
      .then((ps) => {
        assert(ps.currentElection === true);
        done();
      })
    });
  });

  it.only('pollingstation currentTeam returns pollingstation team for current election', (done) => {
    const thisPollingstation = new Pollingstation(THM.pollingstationObj);
    const thisUser1 = new User(THM.userObj1);
    const thisUser2 = new User(THM.userObj2);
    const thisUser3 = new User(THM.userObj3);
    thisPollingstation.set( '_id', '5a3047c071b36b39cfce6600')
    Promise.all([thisPollingstation.save(), thisUser1.save(), thisUser2.save(), thisUser3.save()])
    .then(() => {
      Pollingstation.findOne({ precinctNumber: 'thisPrecinctNumber' })
      .then(async (ps) => {
        const team = await ps.currentTeam;
        // console.log('PS', ps);
        // console.log('TEAM', await ps.currentTeam);
        assert(team.length === 2);
        done();
      })
    });
  });

})