const User = require('../models/user');
const Volunteer = require('../models/volunteer');
const assert = require('assert');

describe('Creating records (user and volunteer, etc)', () => {

  it('saves a user', (done) => {
    const thisUser = new User({
      username: 'thisUsername',
      password: 'thisPassword'
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

  it('saves a volunteer', (done) => {
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
      partyAffiliation: 'thisVolunteerPartyAffiliation'
   });
    thisVolunteer.save()
      .then(() => {
        assert(!thisVolunteer.isNew);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

})

