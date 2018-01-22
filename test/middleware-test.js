const Schedule = require('../models/schedule');
const User = require('../models/user');
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
  thisUser.save()
    .then(() =>
      Promise.all([thisSchedule2.save(), thisSchedule3.save(), thisSchedule4.save(), thisSchedule5.save()])
      .then(() => {
        const thisSchedule6 = new Schedule(THM.scheduleObj);
        thisSchedule6.userId = thisUser._id;
        thisSchedule6.save()
          .then(() => {
            assert(!thisSchedule6.isNew);
          })
          .then(() => {
            User.findById(thisUser._id)
              .then((user) => {
                assert(user.status === 'lockdown');
                done();
              })
          })
          .catch((e) => {
            done(e);
          })
      })
      .catch((e) => {
        done(e);
    }))
  });

  it('pushes scheduleId to user after saving a schedule', (done) => {
    const thisUser = new User(THM.userObj);
    const thisSchedule2 = new Schedule(THM.scheduleObj);
    thisSchedule2.userId = thisUser._id;
    thisUser.save()
      .then(() => {
          thisSchedule2.save()
          .then(() => {
            User.findOne({ '_id': thisUser._id})
              .then((user) => {
                assert(user.schedule.length === 2)
                done();
              })
            })
        })
    });

})