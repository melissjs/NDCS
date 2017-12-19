// const Volunteer = require('../models/volunteer');
// const assert = require('assert');

// describe('Virtual types (records calculated but not saved in db)', () => {

//   it('scheduleCount returns number of scheduled audits', (done) => {
//     const thisVolunteer = new Volunteer({
//       userId: '5a3047c071b36b39cfce6640',
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
//         pollingStationId: '5a3047c071b36b39cfce6640',
//         electionId: '5a3047c071b36b39cfce6640',
//         shifts: [4,5,6]
//       }, {
//         pollingStationId: '5a3047c071b36b39cfce6640',
//         electionId: '5a3047c071b36b39cfce6640',
//         shifts: [1,2,3]
//       }]
//     });
//     thisVolunteer.save()
//       .then(() => Volunteer.findOne({ firstName: 'thisVolunteerFirstName' }))
//       .then((volunteer) => {
//         assert(volunteer.scheduleCount === 2)
//         done();
//       })
//   });

// })