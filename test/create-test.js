const User = require('../models/user');
const Election = require('../models/election');
const Pollingstation = require('../models/pollingstation');
const assert = require('assert');
const THM = require('./test-helper-methods');

describe('Creating records (user and volunteer, etc)', () => {

  it('saves a user', (done) => {
    const thisUser = new User(THM.userObj);
    thisUser.save()
      .then(() => {
        assert(!thisUser.isNew);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('saves an election', (done) => {
    thisElection = new Election(THM.electionObj);
    thisElection.save()
      .then(() => {
        assert(!thisElection.isNew);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('saves a pollingstation', (done) => {
    thisPollingStation = new Pollingstation(THM.pollingstationObj);
    thisPollingStation.save()
    .then(() => {
      assert(!thisPollingStation.isNew);
      done();
    })
    .catch((e) => {
      done(e);
    });
  });

})

