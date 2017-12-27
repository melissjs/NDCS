const User = require('../models/user');
const Election = require('../models/election');
const Pollingstation = require('../models/pollingstation');

const THM = {

  affidavitObj: {
    firstName: 'thisVoterFirstName', 
    lastName: 'thisVoterLastName',
    consent: true,
    streetAddress: '111ThisStreet',
    zip: 10001,
    emailAddress: 'thisVoter@Email.Address',
    comments: 'AffidavitComment',
    volunteerId: '5a3047c071b36b39cfce6640',
    electionId: '5a3047c071b36b39cfce6640',
    timestamp: Date.now()
  },

  electionObj: {
    cIId: 'thiscIId',
    electionTitle: 'thisElectionTitle',
    electionDay: Date.now(),
    electionType: 'primary',
    ocdDivisionId: 'thisOcdDivisionId',
    previousElection: '5a3047c071b36b39cfce6640',
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
    emailAddress: 'thisVolunteer@Email.Address',
    exposeEmail: 'thisVolunteerExposeEmail',
    phoneNumber: 'thisVolunteerPhoneNumber',
    age: 22,
    sex: 'thisVolunteerSex',
    partyAffiliation: 'thisVolunteerPartyAffiliation',
    schedule: [{
      pollingStationId: '5a3047c071b36b39cfce6640',
      electionId: '5a3047c071b36b39cfce6640',
      shifts: [1,2,3]
    }],
    timeSheet: [{
      roleInOrOut: 'in',
      location: {
        type: 'Point', 
        coordinates: [111, 111]
       },
       authenticatingVolunteerId: '5a3047c071b36b39cfce6640',
       electionId: '5a3047c071b36b39cfce6640'
    }]
  }

}

module.exports = THM;