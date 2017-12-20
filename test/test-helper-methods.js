const User = require('../models/user');
const Election = require('../models/election');
const Pollingstation = require('../models/pollingstation');

const THM = {

  electionObj: {
    pollingStationId: ['5a3047c071b36b39cfce6640'],
    electionTitle: '2018 Midterm Election',
    electionType: 'primary',
    country: 'USA'
  },

  pollingstationObj: {
    precinctNumber: 'thisprecinctNumber',
    streetAddress: 'thisStreetAddress',
    unitNumber: 'thisUnitNumber',
    roomNumber: 'thisRoomNumber',
    city: 'thisCity',
    state: 'thisState',
    zip: 10001
  },

   userObj: {
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
  }

}

module.exports = THM;