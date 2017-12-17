
const Volunteer = require('../models/volunteer');
const assert = require('assert');

describe('Creating, adding and deleting Sub Schemas (volunteer schedule)', () => {

  it('can create volunteer with schedule sub schema', (done) => {
    const thisVolunteer = new Volunteer({
      userId: '5a3047c071b36b39cfce6640',
      volunteerRoles: ['user', 'volunteer'],
      firstName: 'thisVolunteerFirstName', 
      lastName: 'thisVolunteerLastName',
      emailAddress: 'thisVolunteerEmailAddress',
      exposeEmail: 'thisVolunteerExposeEmail',
      phoneNumber: 'thisVolunteerPhoneNumber',
      age: 22,
      sex: 'thisVolunteerSex',
      partyAffiliation: 'thisVolunteerPartyAffiliation',
      schedule: [{
        pollingStationId: '5a3047c071b36b39cfce6640',
        electionId: '5a3047c071b36b39cfce6640',
        shifts: [1,2,3]
      }]
    });
    thisVolunteer.save()
      .then(() => Volunteer.findOne({ firstName: 'thisVolunteerFirstName' }))
      .then((volunteer) => {
        assert(volunteer.schedule[0].shifts[0] === 1);
        done();
      })
  })

  it('can create subsequent schedule array items to existing volunteer', (done) => {
    const thisVolunteer = new Volunteer({
      userId: '5a3047c071b36b39cfce6640',
      volunteerRoles: ['user', 'volunteer'],
      firstName: 'thisVolunteerFirstName', 
      lastName: 'thisVolunteerLastName',
      emailAddress: 'thisVolunteerEmailAddress',
      exposeEmail: 'thisVolunteerExposeEmail',
      phoneNumber: 'thisVolunteerPhoneNumber',
      age: 22,
      sex: 'thisVolunteerSex',
      partyAffiliation: 'thisVolunteerPartyAffiliation',
      schedule: []
    });
    thisVolunteer.save()
      .then(() => Volunteer.findOne({ firstName: 'thisVolunteerFirstName' }))
      .then((volunteer) => {
        volunteer.schedule.push({
          pollingStationId: '5a3047c071b36b39cfce6640',
          electionId: '5a3047c071b36b39cfce6640',
          shifts: [4,5,6]
        });
        return volunteer.save();
      })
      .then(() => Volunteer.findOne({ firstName: 'thisVolunteerFirstName' }))
      .then((volunteer) => {
        assert(volunteer.schedule[0].shifts[0] === 4);
        done();
      });
  });

  it('can create delete schedule array item from existing volunteer', (done) => {
    const thisVolunteer = new Volunteer({
      userId: '5a3047c071b36b39cfce6640',
      volunteerRoles: ['user', 'volunteer'],
      firstName: 'thisVolunteerFirstName', 
      lastName: 'thisVolunteerLastName',
      emailAddress: 'thisVolunteerEmailAddress',
      exposeEmail: 'thisVolunteerExposeEmail',
      phoneNumber: 'thisVolunteerPhoneNumber',
      age: 22,
      sex: 'thisVolunteerSex',
      partyAffiliation: 'thisVolunteerPartyAffiliation',
      schedule: [{
        pollingStationId: '5a3047c071b36b39cfce6640',
        electionId: '5a3047c071b36b39cfce6640',
        shifts: [4,5,6]
      }]
    });
    thisVolunteer.save()
      .then(() => Volunteer.findOne({ firstName: 'thisVolunteerFirstName' }))
      .then((volunteer) => {
        volunteer.schedule[0].remove()
        return volunteer.save();
      })
      .then(() => Volunteer.findOne({ firstName: 'thisVolunteerFirstName' }))
      .then((volunteer) => {
        assert(volunteer.schedule.length === 0);
        done();
      });
  });

})

