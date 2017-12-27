const Affidavit = require('../models/affidavit');
const Amendment = require('../models/amendment');
const Anomaly = require('../models/anomaly');
const User = require('../models/user');
const Election = require('../models/election');
const Pollingstation = require('../models/pollingstation');
const assert = require('assert');
const THM = require('./test-helper-methods');

describe('Creating records (user and volunteer, etc)', () => {

  it('saves an affidavit', (done) => {
    const thisAffidavit = new Affidavit(THM.affidavitObj);
    thisAffidavit.save()
    .then(() => {
      assert(!thisAffidavit.isNew);
      done();
    })
    .catch((e) => {
      done(e);
    });
  });

  it('saves an amendment record', (done) => {
    thisAmendment = new Amendment(THM.amendmentObj);
    thisAmendment.save()
    .then(() => {
      assert(!thisAmendment.isNew);
      done();
    })
    .catch((e) => {
      done(e);
    });
  });

  it.only('saves an anomaly record', (done) => {
    thisAnomaly = new Anomaly(THM.anomalyObj);
    thisAnomaly.save()
    .then(() => {
      assert(!thisAnomaly.isNew);
      done();
    })
    .catch((e) => {
      done(e);
    });
  });

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

