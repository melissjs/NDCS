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
        let newUserRoles = volunteer.userRoles.concat([{
          role: 'auditor',
          active: true,
          initiated: [{
            authenticatingUserId: '5a3047c071b36b39cfce7722',
            date: Date.now()
          }],
          activated: [{
            authenticatingUserId: '5a3047c071b36b39cfce7722',
            date: Date.now()
          }],
          inactivated: [null]
        }]);
        volunteer.userRoles = newUserRoles;
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

