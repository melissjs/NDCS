const User = require('../models/user');
const assert = require('assert');
const THM = require('./test-helper-methods');

describe('Creating, adding and deleting Sub Schemas (volunteer userRoles)', () => {

  it('can create volunteer with userRoles sub schema', (done) => {
    const thisVolunteer = new User(THM.userObj);
    thisVolunteer.save()
      .then(() => User.findOne({ firstName: 'thisVolunteerFirstName' }))
      .then((volunteer) => {
        assert(volunteer.userRoles[0].role === 'user');
        done();
      })
  })

  it('can create subsequent userRoles array item to existing volunteer', (done) => {
    const thisVolunteer = new User(THM.userObj);
    thisVolunteer.save()
      .then(() => User.findOne({ firstName: 'thisVolunteerFirstName' }))
      .then((volunteer) => {
        volunteer.userRoles.push({
          role: 'auditor',
          active: true,
          dateInitiated: [Date.now()],
          dateActivated: [Date.now()],
          dateInactivated: [null],
          auth: {
            authenticatingUserId: '5a3047c071b36b39cfce6640',
            date: Date.now()
          }
        });
        volunteer.save()
        .then(() => User.findOne({ firstName: 'thisVolunteerFirstName' }))
        .then((volunteer) => {
          assert(volunteer.userRoles[2].role === 'auditor');
          done();
        });
      });
  })

  it('can create delete userRoles array item from existing volunteer', (done) => {
    const thisVolunteer = new User(THM.userObj);
    thisVolunteer.save()
      .then(() => User.findOne({ firstName: 'thisVolunteerFirstName' }))
      .then((volunteer) => {
        volunteer.userRoles[1].remove()
        return volunteer.save();
      })
      .then(() => User.findOne({ firstName: 'thisVolunteerFirstName' }))
      .then((volunteer) => {
        assert(volunteer.userRoles.length === 1);
        done();
      });
  });

})

