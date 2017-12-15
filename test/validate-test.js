const Volunteer = require('../models/volunteer');
const assert = require('assert');

describe('Validation tests', () => {
  // let thisVolunteer;

  // beforeEach((done) => {
  //   thisVolunteer = new Volunteer({ 
  //     volunteerKey: '5a3047c071b36b39cfce6640',
  //     firstName: 'thisVolunteerFirstname', 
  //     lastName: 'thisVolunteerLastName',
  //     emailAddress: 'thisVolunteerEmailAddress',
  //     exposeEmail: 'thisVolunteerExposeEmail',
  //     phoneNumber: 'thisVolunteerPhoneNumber',
  //     age: 'thisVolunteerAge',
  //     sex: 'thisVolunteerSex',
  //     partyAffiliation: 'thisVolunteerPartyAffiliation',
  //     shifts: 'thisVolunteerShifts',
  //     associatedPollingStationKey: '5a3047c071b36b39cfce6640'
  //  });
  //   thisVolunteer.save()
  //     .then(() => done());
  // });

  it('Requires a first name', () => {
    const thisVolunteer = new Volunteer({ 
      volunteerKey: '5a3047c071b36b39cfce6640',
      firstName: undefined, 
      lastName: 'thisVolunteerLastName',
      emailAddress: 'thisVolunteerEmailAddress',
      exposeEmail: 'thisVolunteerExposeEmail',
      phoneNumber: 'thisVolunteerPhoneNumber',
      age: 'thisVolunteerAge',
      sex: 'thisVolunteerSex',
      partyAffiliation: 'thisVolunteerPartyAffiliation',
      shifts: 'thisVolunteerShifts',
      associatedPollingStationKey: '5a3047c071b36b39cfce6640'
   });
   const validationResult = thisVolunteer.validateSync();
   const { message } = validationResult.errors.firstName;
   assert(message === 'First name is required')
  });

  it('Requires a last name with at least two characters', () => {
    const thisVolunteer = new Volunteer({ 
      volunteerKey: '5a3047c071b36b39cfce6640',
      firstName: 'thisVolunteerFirstName', 
      lastName: 't',
      emailAddress: 'thisVolunteerEmailAddress',
      exposeEmail: 'thisVolunteerExposeEmail',
      phoneNumber: 'thisVolunteerPhoneNumber',
      age: 'thisVolunteerAge',
      sex: 'thisVolunteerSex',
      partyAffiliation: 'thisVolunteerPartyAffiliation',
      shifts: 'thisVolunteerShifts',
      associatedPollingStationKey: '5a3047c071b36b39cfce6640'
   });
   const validationResult = thisVolunteer.validateSync();
   const { message } = validationResult.errors.lastName;
   assert(message === 'Last name must be at least two characters')
  });

})

