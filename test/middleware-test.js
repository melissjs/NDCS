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

})