const User = require('../models/user');
const assert = require('assert');
const THM = require('./test-helper-methods');

describe('Validation tests', () => {

  it('Requires a unique username', (done) => {
    const thisUser = new User(THM.userObj);
    thisUser.save()
    .then(() => {
      const thisOtherUser = new User(THM.userObj);
      thisOtherUser.validate()
      .catch((validationResult) => {
        const { message } = validationResult.errors.username;
        assert(message === 'username must be unique, please enter another');
        done();
      })
    })
  })

  it('Requires a first name', () => {
    const thisVolunteer = new User(THM.userObj);
    thisVolunteer.firstName = undefined;
   const validationResult = thisVolunteer.validateSync();
   const { message } = validationResult.errors.firstName;
   assert(message === 'First name is required')
  });

  it('Requires a last name with at least two characters', () => {
    const thisVolunteer = new User(THM.userObj);
    thisVolunteer.lastName = 'T';
   const validationResult = thisVolunteer.validateSync();
   const { message } = validationResult.errors.lastName;
   assert(message === 'Last name must be at least two characters')
  });

  it('Disallows invalid records to be saved', () => {
    const thisVolunteer = new User(THM.userObj);
    thisVolunteer.firstName = undefined;
    thisVolunteer.lastName = 'T';
   thisVolunteer.save()
    .catch((validationResult) => {
      const messageFirst = validationResult.errors.firstName.message;
      const messageLast = validationResult.errors.lastName.message;
      assert(messageFirst === 'First name is required')
      assert(messageLast === 'Last name must be at least two characters');
    });
  });

  it('can validate schedule sub schema (shifts custom validation)', (done) => {
    const thisVolunteer = new User(THM.userObj);
    thisVolunteer.schedule[0].shifts.push(9);
    thisVolunteer.save()
    .catch((validationResult) => {
      const { message } = validationResult.errors['schedule.0.shifts'];
      assert(message === 'Invalid shift options');
      done();
    });
  });

  it('can validate schedule sub schema (electionId required)', (done) => {
    const thisVolunteer = new User(THM.userObj);
    thisVolunteer.schedule[0].electionId = undefined;
    thisVolunteer.save()
    .catch((validationResult) => {
      const { message } = validationResult.errors['schedule.0.electionId'];
      assert(message === 'Path `electionId` is required.');
      done();
    });
  });

})

