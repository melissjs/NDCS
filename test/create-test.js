const Affidavit = require('../models/affidavit');
const Amendment = require('../models/amendment');
const Anomaly = require('../models/anomaly');
const Audit = require('../models/audit');
const Candidate = require('../models/candidate');
const Contact = require('../models/contact');
const Demographics = require('../models/demographics');
const Election = require('../models/election');
const Electoffice = require('../models/electoffice');
const Evidence = require('../models/evidence');
const Officevote = require('../models/officevote');
const Pollingstation = require('../models/pollingstation');
const Schedule = require('../models/schedule');
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

  it('saves an audit', (done) => {
    const thisAudit = new Audit(THM.auditObj);
    thisAudit.save()
      .then(() => {
        assert(!thisAudit.isNew);
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

  it('saves a schedule', (done) => {
    const thisUser = new User(THM.userObj);
    const thisSchedule = new Schedule(THM.scheduleObj);
    thisSchedule.userId = thisUser._id;
    thisUser.save()
    .then(() =>
      thisSchedule.save()
      .then(() => {
        assert(!thisSchedule.isNew);
        done();
      })
      .catch((e) => {
        done(e);
    }))
  });

  it.only('disallows saving a schedule when user already has 5 active schedule items', (done) => {
    const thisUser = new User(THM.userObj);
    const thisSchedule2 = new Schedule(THM.scheduleObj);
    const thisSchedule3 = new Schedule(THM.scheduleObj);
    const thisSchedule4 = new Schedule(THM.scheduleObj);
    const thisSchedule5 = new Schedule(THM.scheduleObj);
    thisSchedule2.userId = thisUser._id;
    thisSchedule3.userId = thisUser._id;
    thisSchedule4.userId = thisUser._id;
    thisSchedule5.userId = thisUser._id;
    thisUser.schedule.push(thisSchedule2, thisSchedule3, thisSchedule4, thisSchedule5)
    // console.log('USER', thisUser)
    thisUser.save()
    .then(() =>
      Promise.all([thisSchedule2.save(), thisSchedule3.save(), thisSchedule4.save(), thisSchedule5.save()])
      .then(() => {
        const thisSchedule6 = new Schedule(THM.scheduleObj);
        thisSchedule6.userId = thisUser._id;
        thisSchedule6.save()
          .then(() => {
            // assert(thisSchedule6.isNew);
            // console.log('NEW', thisSchedule6.isNew)
            done();
          })
          .catch((e) => {
            // console.log('NEW', thisSchedule6.isNew)
            console.log('NEW')
            done(e);
          })
      })
      .catch((e) => {
        done(e);
    }))
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

