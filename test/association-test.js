const Volunteer = require('../models/volunteer');
const User = require('../models/user');
const Election = require('../models/election');
const Pollingstation = require('../models/pollingstation');
const assert = require('assert');

describe('Associations', () => {
  let thisUser, thisVolunteer, thisElection, thisPollingStation;

  beforeEach((done) => {
    thisUser = new User({
      username: 'thisUsername', 
      password: 'thisPassword'
    });

    thisVolunteer = new Volunteer({ 
      // userId: '5a3047c071b36b39cfce6640',
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
        // pollingStationId: '5a3047c071b36b39cfce6640',
        // electionId: '5a3047c071b36b39cfce6640',
        shifts: [1,2]
      }]
   });

    thisElection = new Election({
      electionTitle: '2018 Midterm Election',
      electionType: 'primary',
      country: 'USA'
    });

    thisPollingStation = new Pollingstation({
      // electionId: 'thisElectionId',
      precinctNumber: 'thisprecinctNumber',
      streetAddress: 'thisStreetAddress',
      unitNumber: 'thisUnitNumber',
      roomNumber: 'thisRoomNumber',
      city: 'thisCity',
      state: 'thisState',
      zip: '00000'
    })

    thisVolunteer.userId = thisUser;
    thisVolunteer.schedule[0].pollingStationId = thisPollingStation;
    thisVolunteer.schedule[0].electionId = thisElection;
    thisPollingStation.electionId = thisElection;

    Promise.all([thisUser.save(), thisVolunteer.save(), thisPollingStation.save(), thisElection.save()])
    .then(() => done());
    
  });

  it('Saves relation between user and volunteer', (done) => {
    Volunteer.findOne({ firstName: 'thisVolunteerFirstName' }).populate('userId')
      .then((volunteer) => {
        assert(volunteer.userId.password === 'thisPassword');
        done();
      });
  })

  it('Saves a full relation graph', (done) => {
    Volunteer.findOne({ firstName: 'thisVolunteerFirstName' })
      .populate('userId')
      .populate({
        path: 'schedule.pollingStationId',
        populate: { 
          path: 'electionId',
          model: 'Election'
        }
      })
      .then((volunteer) => {
        assert(volunteer.userId.password === 'thisPassword');
        assert(volunteer.schedule[0].electionId.toString() == volunteer.schedule[0].pollingStationId.electionId._id.toString());
        done();
      })
  })

})