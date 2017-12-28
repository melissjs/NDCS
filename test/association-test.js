const User = require('../models/user');
const Election = require('../models/election');
const Pollingstation = require('../models/pollingstation');
const assert = require('assert');
const THM = require('./test-helper-methods');

describe.only('Associations', () => {
  let thisUser, thisVolunteer, thisElection, thisPollingStation;

  beforeEach((done) => {
    thisUser = new User(THM.userObj);
    thisElection = new Election(THM.electionObj);
    thisPreviousElection = new Election(THM.previousElectionObj);
    thisPollingStation = new Pollingstation(THM.pollingstationObj)
    thisElection.previousElection = thisPreviousElection;
    thisUser.schedule[0].pollingStationId = thisPollingStation;
    thisUser.schedule[0].electionId = thisElection;
    thisUser.schedule[0].shifts = [1, 2];
    Promise.all([thisUser.save(), thisPollingStation.save(), thisElection.save(), thisPreviousElection.save()])
    .then(() => done());
  });

  it('Saves relation between user and pollingstation', (done) => {
    User.findOne({ firstName: 'thisVolunteerFirstName' })
    .populate('schedule.pollingStationId')
    .then((user) => {
      assert(user.schedule[0].pollingStationId.zip === 11111);
      done();
    });
  })

  it('Saves a full relation graph', (done) => {
    User.findOne({ firstName: 'thisVolunteerFirstName' })
      .populate('schedule.pollingStationId')
      .populate({
        path: 'schedule.electionId',
        model: 'Election',
        populate: { 
          path: 'previousElection',
          model: 'Election'
        }
      })
      .then((user) => {
        assert(user.schedule[0].pollingStationId.zip === 11111);
        assert(user.schedule[0].electionId.previousElection.electionTitle === 'thisPreviousElectionTitle');
        done();
      })
  })

})









// const User = require('../models/user');
// const Election = require('../models/election');
// const Pollingstation = require('../models/pollingstation');
// const assert = require('assert');
// const THM = require('./test-helper-methods');

// describe('Associations', () => {
//   let thisUser, thisVolunteer, thisElection, thisPollingStation;

//   beforeEach((done) => {
//     thisUser = new User({
//       username: 'thisUsername', 
//       password: 'thisPassword',
//       volunteerRoles: ['user', 'volunteer'],
//       firstName: 'thisVolunteerFirstName', 
//       lastName: 'thisVolunteerLastName',
//       emailAddress: 'thisVolunteerEmailAddress',
//       exposeEmail: 'thisVolunteerExposeEmail',
//       phoneNumber: 'thisVolunteerPhoneNumber',
//       age: 22,
//       sex: 'thisVolunteerSex',
//       partyAffiliation: 'thisVolunteerPartyAffiliation',
//       schedule: [{
//           // pollingStationId: '5a3047c071b36b39cfce6640',
//           // electionId: '5a3047c071b36b39cfce6640',
//           shifts: [1,2]
//       }]
//     });

//     thisElection = new Election({
//       //   pollingStationId: ['thisPollingStationId'],
//       electionTitle: '2018 Midterm Election',
//       electionType: 'primary',
//       country: 'USA'
//     });

//     thisPollingStation = new Pollingstation({
//       precinctNumber: 'thisprecinctNumber',
//       streetAddress: 'thisStreetAddress',
//       unitNumber: 'thisUnitNumber',
//       roomNumber: 'thisRoomNumber',
//       city: 'thisCity',
//       state: 'thisState',
//       zip: 10001
//     })

//     thisUser.schedule[0].pollingStationId = thisPollingStation;
//     thisUser.schedule[0].electionId = thisElection;
//     thisElection.pollingStationId.push(thisPollingStation);

//     Promise.all([thisUser.save(), thisPollingStation.save(), thisElection.save()])
//     .then(() => done());
//   });

//   it('Saves relation between user and pollingstation', (done) => {
//     User.findOne({ firstName: 'thisVolunteerFirstName' })
//     .populate('schedule.pollingStationId')
//     .then((user) => {
//       assert(user.schedule[0].pollingStationId.zip === 10001);
//       done();
//     });
//   })

//   it('Saves a full relation graph', (done) => {
//     User.findOne({ firstName: 'thisVolunteerFirstName' })
//       .populate('schedule.pollingStationId')
//       .populate({
//         path: 'schedule.electionId',
//         populate: { 
//           path: 'pollingStationId',
//           model: 'Pollingstation'
//         }
//       })
//       .then((user) => {
//         assert(user.schedule[0].pollingStationId.zip === 10001);
//         assert(user.schedule[0].electionId.pollingStationId[0]._id.toString() == user.schedule[0].pollingStationId._id.toString());
//         done();
//       })
//   })

// })