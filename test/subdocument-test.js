const User = require('../models/user');
const assert = require('assert');
const THM = require('./test-helper-methods');

describe('Creating, adding and deleting Sub Schemas (volunteer schedule)', () => {

  it('can create volunteer with schedule sub schema', (done) => {
    const thisVolunteer = THM.thisUser;
    thisVolunteer.save()
      .then(() => User.findOne({ firstName: 'thisVolunteerFirstName' }))
      .then((volunteer) => {
        assert(volunteer.schedule[0].shifts[0] === 1);
        done();
      })
  })

  it('can create subsequent schedule array items to existing volunteer', (done) => {
    const thisVolunteer = THM.thisUser;
    thisVolunteer.save()
      .then(() => User.findOne({ firstName: 'thisVolunteerFirstName' }))
      .then((volunteer) => {
        volunteer.schedule.push({
          pollingStationId: '5a3047c071b36b39cfce6640',
          electionId: '5a3047c071b36b39cfce6640',
          shifts: [4,5,6]
        });
        return volunteer.save();
      })
      .then(() => User.findOne({ firstName: 'thisVolunteerFirstName' }))
      .then((volunteer) => {
        assert(volunteer.schedule[1].shifts[0] === 4);
        done();
      });
  });

  it('can create delete schedule array item from existing volunteer', (done) => {
    const thisVolunteer = THM.thisUser;
    thisVolunteer.save()
      .then(() => User.findOne({ firstName: 'thisVolunteerFirstName' }))
      .then((volunteer) => {
        volunteer.schedule[0].remove()
        return volunteer.save();
      })
      .then(() => User.findOne({ firstName: 'thisVolunteerFirstName' }))
      .then((volunteer) => {
        assert(volunteer.schedule.length === 0);
        done();
      });
  });

})

