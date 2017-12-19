// const Volunteer = require('../models/volunteer');
// const User = require('../models/user');
// const assert = require('assert');

// describe('Validation tests', () => {

//   it('Requires a unique username', (done) => {
//     const thisUser = new User({
//       username: 'thisUsername',
//       password: 'thisPassword'
//     });
//     thisUser.save()
//     .then(() => {
//       const thisOtherUser = new User({
//         username: 'thisUsername',
//         password: 'thisPassword'
//       });
//       thisOtherUser.validate()
//       .catch((validationResult) => {
//         const { message } = validationResult.errors.username;
//         assert(message === 'Username must be unique, please enter another username');
//         done();
//       })
//     })
//   })

//   it('Requires a first name', () => {
//     const thisVolunteer = new Volunteer({ 
//       userId: '5a3047c071b36b39cfce6640',
//       volunteerRoles: ['user', 'volunteer'],
//       firstName: undefined, 
//       lastName: 'thisVolunteerLastName',
//       emailAddress: 'thisVolunteerEmailAddress',
//       exposeEmail: 'thisVolunteerExposeEmail',
//       phoneNumber: 'thisVolunteerPhoneNumber',
//       age: 22,
//       sex: 'thisVolunteerSex',
//       partyAffiliation: 'thisVolunteerPartyAffiliation'
//    });
//    const validationResult = thisVolunteer.validateSync();
//    const { message } = validationResult.errors.firstName;
//    assert(message === 'First name is required')
//   });

//   it('Requires a last name with at least two characters', () => {
//     const thisVolunteer = new Volunteer({ 
//       userId: '5a3047c071b36b39cfce6640',
//       volunteerRoles: ['user', 'volunteer'],
//       firstName: 'thisVolunteerFirstName', 
//       lastName: 't',
//       emailAddress: 'thisVolunteerEmailAddress',
//       exposeEmail: 'thisVolunteerExposeEmail',
//       phoneNumber: 'thisVolunteerPhoneNumber',
//       age: 22,
//       sex: 'thisVolunteerSex',
//       partyAffiliation: 'thisVolunteerPartyAffiliation'
//    });
//    const validationResult = thisVolunteer.validateSync();
//    const { message } = validationResult.errors.lastName;
//    assert(message === 'Last name must be at least two characters')
//   });

//   it('Disallows invalid records to be saved', () => {
//     const thisVolunteer = new Volunteer({ 
//       userId: '5a3047c071b36b39cfce6640',
//       volunteerRoles: ['user', 'volunteer'],
//       firstName: undefined, 
//       lastName: 't',
//       emailAddress: 'thisVolunteerEmailAddress',
//       exposeEmail: 'thisVolunteerExposeEmail',
//       phoneNumber: 'thisVolunteerPhoneNumber',
//       age: 22,
//       sex: 'thisVolunteerSex',
//       partyAffiliation: 'thisVolunteerPartyAffiliation'
//    });
//    thisVolunteer.save()
//     .catch((validationResult) => {
//       const messageFirst = validationResult.errors.firstName.message;
//       const messageLast = validationResult.errors.lastName.message;
//       assert(messageFirst === 'First name is required')
//       assert(messageLast === 'Last name must be at least two characters');
//     });
//   });

//     it('can validate schedule sub schema (shifts custom validation)', (done) => {
//       const thisVolunteer = new Volunteer({
//         userId: '5a3047c071b36b39cfce6640',
//         volunteerRoles: ['user', 'volunteer'],
//         firstName: 'thisVolunteerFirstName', 
//         lastName: 'thisVolunteerLastName',
//         emailAddress: 'thisVolunteerEmailAddress',
//         exposeEmail: 'thisVolunteerExposeEmail',
//         phoneNumber: 'thisVolunteerPhoneNumber',
//         age: 22,
//         sex: 'thisVolunteerSex',
//         partyAffiliation: 'thisVolunteerPartyAffiliation',
//         schedule: [{
//           pollingStationId: '5a3047c071b36b39cfce6640',
//           electionId: '5a3047c071b36b39cfce6640',
//           shifts: [1,2,3,9]
//         }]
//       });
//       thisVolunteer.save()
//       .catch((validationResult) => {
//         const { message } = validationResult.errors['schedule.0.shifts'];
//         assert(message === 'Invalid shift options');
//         done();
//       });
//     });

//   it('can validate schedule sub schema (electionId required)', (done) => {
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
//         electionId: undefined,
//         shifts: [1,2,3]
//       }]
//     });
//     thisVolunteer.save()
//     .catch((validationResult) => {
//       const { message } = validationResult.errors['schedule.0.electionId'];
//       assert(message === 'Path `electionId` is required.');
//       done();
//     });
//   });

// })

