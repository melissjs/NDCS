const User = require('../models/user');
const assert = require('assert');
const THM = require('./test-helper-methods');

describe('Reading records', () => {
  let thisUser;

  beforeEach((done) => {
    thisUser = new User({
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
        done()
      });
  });

  it('Reads all users named thisUsername', (done) => {
    User.find({ username: 'thisUsername' })
    .then((users) => {
      assert(users[0]._id.toString() === thisUser._id.toString());
      done();
    })
  });

  it('finds a user with _id', (done) => {
    User.findOne({ _id: thisUser._id })
    .then((user) => {
      assert(user.username === 'thisUsername');
      done();
    });
  })

})

