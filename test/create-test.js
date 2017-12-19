const User = require('../models/user');
const Election = require('../models/election');
const Pollingstation = require('../models/pollingstation');
const assert = require('assert');
const THM = require('./test-helper-methods');

describe('Creating records (user and volunteer, etc)', () => {

  it('saves a user', (done) => {
    const thisUser = new User({
      username: 'thisUsername',
      password: 'thisPassword',
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
    thisUser.save()
      .then(() => {
        assert(!thisUser.isNew);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('saves an election', (done) => {
    thisElection = new Election({
      electionTitle: '2018 Midterm Election',
      electionType: 'primary',
      country: 'USA'
    });
    thisElection.save()
      .then(() => {
        assert(!thisElection.isNew);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('saves a pollingstation', (done) => {
    thisPollingStation = new Pollingstation({
      electionId: '5a3047c071b36b39cfce6640',
      precinctNumber: 'thisprecinctNumber',
      streetAddress: 'thisStreetAddress',
      unitNumber: 'thisUnitNumber',
      roomNumber: 'thisRoomNumber',
      city: 'thisCity',
      state: 'thisState',
      zip: '00000'
    })
    thisPollingStation.save()
    .then(() => {
      assert(!thisPollingStation.isNew);
      done();
    })
    .catch((e) => {
      done(e);
    });
  });

})

