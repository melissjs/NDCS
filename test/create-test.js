const Affidavit = require('../models/affidavit');
const Amendment = require('../models/amendment');
const Anomaly = require('../models/anomaly');
const Candidate = require('../models/candidate');
const Contact = require('../models/contact');
const Demographics = require('../models/demographics');
const Election = require('../models/election');
const Electoffice = require('../models/electoffice');
const Evidence = require('../models/evidence');
const Officevote = require('../models/officevote');
const Pollingstation = require('../models/pollingstation');
const User = require('../models/user');
const Vote = require('../models/vote');
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

  it('saves an anomaly record', (done) => {
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

  it('saves an candidate', (done) => {
    thisCandidate = new Candidate(THM.candidateObj);
    thisCandidate.save()
    .then(() => {
      assert(!thisCandidate.isNew);
      done();
    })
    .catch((e) => {
      done(e);
    });
  });

  it('saves a contact record', (done) => {
    thisContact = new Contact(THM.contactObj);
    thisContact.save()
    .then(() => {
      assert(!thisContact.isNew);
      done();
    })
    .catch((e) => {
      done(e);
    });
  });

  it('saves a demographics record', (done) => {
    thisDemographics = new Demographics(THM.demographicsObj);
    thisDemographics.save()
    .then(() => {
      assert(!thisDemographics.isNew);
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

  it('saves an electOffice', (done) => {
    thisElectOffice = new Electoffice(THM.electOfficeObj);
    thisElectOffice.save()
      .then(() => {
        assert(!thisElectOffice.isNew);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('saves an evidence record', (done) => {
    thisEvidence = new Evidence(THM.evidenceObj);
    thisEvidence.save()
      .then(() => {
        assert(!thisEvidence.isNew);
        console.log
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

  it('saves an officevote record', (done) => {
    thisElectOffice = new Electoffice(THM.electOfficeObj);
    thisElectOffice.save()
      .then(() => {
        thisOfficeVote = new Officevote(THM.officeVoteObj);
        thisOfficeVote.set('electOfficeId', thisElectOffice._id);
        thisOfficeVote.save()
        .then(() => {
          assert(!thisOfficeVote.isNew);
          done();
        })
        .catch((e) => {
          done(e);
        });
      })
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

  it('saves a vote record', (done) => {
    const thisVote = new Vote(THM.voteObj);
    thisVote.save()
      .then(() => {
        assert(!thisVote.isNew);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });

})

