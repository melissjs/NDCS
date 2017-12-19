const User = require('../models/user');

const THM = {

  createVolunteer: function() {
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
    return thisUser.save()
  }

}

module.exports = THM;