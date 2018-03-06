var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Pollingstation = require('../models/pollingstation');
var Election = require('../models/election');
var Audit = require('../models/audit');
var User = require('../models/user');
var Schedule = require('../models/schedule');
const mongoose = require('mongoose');

// ------------------- AUTH WITH JWT -------------------

/* VALIDATE AUTHORIZATION HEADER THEN APPEND USER TO REQ */
router.use('/', function(req, res, next) {
  let token = req.headers.authorization.split(' ')[1]
  jwt.verify(token, 'secret', function(err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'Not authenticated',
        error: err
      });
    }
    req.authedUser = decoded.user;
    next();
  });
});

// ------------------- GET -------------------

/* GET ALL AUDITS */
router.get('/all', function(req, res, next) {
  Audit.find({})
    .exec(function(err, audits) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: audits
      });
    });
});


// // ------------------- POST -------------------

// /* CREATE NEW USER */
// router.post('/add', function(req, res, next) { // handle if user exists already and is deactivated
//   let pollingstation = new Pollingstation({
//     electionId: req.body.electionId,
//     operative: req.body.operative,
//     precinctNumber: req.body.precinctNumber,
//     locationName: req.body.locationName,
//     streetAddress: req.body.streetAddress,
//     line1: req.body.line1,
//     line2: req.body.line2,
//     line3: req.body.line3,
//     city: req.body.city,
//     state: req.body.state,
//     zip: req.body.zip,
//     pollingHours: req.body.pollingHours,
//     notes: req.body.notes
//   });
//   pollingstation.save(function(err, result){
//     if (err) {
//       return res.status(500).json({
//         title: 'An error occurred while creating pollingstation',
//         error: err
//       });
//     }
//     res.status(201).json({
//       message: 'Pollingstation created',
//       obj: result
//     });
//   });
// });

// ------------------- HELPER FUNCTIONS -------------------

///////////////////////// returnSterilizedAuditors for team member
async function returnSterilizedUsers(userIdArr, reqUser, reqAudit) {
  let users;
  let userArrSterilized = [];
  let activeSched;
  try {
    users = await User.find({ '_id': userIdArr });
    async function createAuditorTeam(passedUsers, authedBool){
      for (const user of passedUsers) {
        let userSterilized = {};
        activeSched = await user.activeSchedule();
        userSterilized._id = user._id;
        userSterilized.firstName = user.firstName;
        userSterilized.lastName = user.lastName;
        userSterilized.userRoles = user.activeRoles;
        if (authedBool) {
          userSterilized.emailAddress = user.emailAddress;
        }
        else {
          (user.exposeEmail) ? userSterilized.emailAddress = user.emailAddress : userSterilized.emailAddress = undefined;
        }
        if (authedBool) {
          userSterilized.phoneNumber = user.phoneNumber;
        }
        else {
          (user.exposePhoneNumber) ? userSterilized.phoneNumber = user.phoneNumber : userSterilized.phoneNumber = undefined;
        }
        if (authedBool) {
          userSterilized.age = user.age;
        }
        else {
          (user.exposeAge) ? userSterilized.age = user.age : userSterilized.age = undefined;
        }
        if (authedBool) {
          userSterilized.sex = user.sex;
        }
        else {
          (user.exposeSex) ? userSterilized.sex = user.sex : userSterilized.sex = undefined;
        }
        if (authedBool) {
          userSterilized.partyAffiliation = user.partyAffiliation;
        }
        else {
          (user.exposePartyAffiliation) ? userSterilized.partyAffiliation = user.partyAffiliation : userSterilized.partyAffiliation = undefined;
        }
        userSterilized.associatedPollingStationKey = reqAudit.pollingStationId;
        // if (activeSched) {
        userSterilized.shifts = activeSched.shifts;
        // } // maybe?
        userArrSterilized.push(userSterilized);
      }
    }

    if (reqUser.activeRoles.includes('lead') || reqUser.activeRoles.includes('admin')) {
      await createAuditorTeam(users, true);
      return userArrSterilized;
    }
    else {
      await createAuditorTeam(users, false);
      return userArrSterilized;
    }
  }
  catch(e) {
    console.error('Error occured', e);
    return null;
  }
}

// ------------------- MIDDLEWARE -------------------

/* RETURNS AUDIT STATS FOR TEAM MEMBER (ACCESS TO TEAM) OR INTERESTED PARTY (NO TEAM ACCESS) */
const auditStats = async (req, res, next) => {
  let teamIds;
  let team;
  let shiftsFilled;
  let auditStats;
  try {
    teamIds = await req.paramAudit.getTeam();
    shiftsFilled = await req.paramAudit.getShiftsFilled();
    try { // onlyforaccess?? teammember or admin
      team = await returnSterilizedUsers(teamIds, req.authedUser, req.paramAudit);
    }
    catch(e) {
      console.log('Error occured', e);
      return null;
    }
  }
  catch(e) {
    console.log('Error occured', e);
    return null;
  }
  if (teamIds.some((uId) => uId.equals(req.authedUser._id))) {
    auditStats = {
      _id: req.paramAudit._id,
      election: req.paramAudit.electionId,
      pollingstationId: req.paramAudit.pollingStationId,
      team: team,
      teamLength: teamIds.length,
      shifts: shiftsFilled
    };
    req.auditStats = auditStats;
    next();
  } 
  else {
    auditStats = {
      _id: req.paramAudit._id,
      election: req.paramAudit.electionId,
      pollingstationId: req.paramAudit.pollingStationId,
      team: undefined,
      teamLength: teamIds.length,
      shifts: shiftsFilled
    }
    req.auditStats = auditStats;
    next()
  }
}

// /* RETURN USERS AUDIT */
// const getAudit = async (req, res, next) =>{
//   authedUsersActiveAudit
//   {
//     auditId: req.activeSched[0].auditId,
//     electionId: req.activeSched[0].electionId,
//     pollingstationId: req.activeSched[0].pollingStationId, //
//     team?: Auditor[];
//     teamLength: number;
//     shifts: req.activeSched[0].shifts,
//   }
// }

// ------------------- ALL (GET POST PUT DELETE) -------------------

/* ALL with electionId/pollingstationId listing. */
router.route('/election/:electionId/pollingstation/:pollingstationId') 
.all(async function(req, res, next) {
  electionId = req.params.electionId;
  pollingstationId = req.params.pollingstationId;
  // console.log('HEREEEEEEEE req.authedUser', req.authedUser)
  if (req.authedUser) {
    Audit.findOne({
      pollingStationId: pollingstationId,
      electionId: electionId
    }, function(err, audit) {
      if (err) {
        return res.status(500).json({
          title: 'An error occured',
          error: err
        })
      }
      else if (audit === null) {
        return res.status(500).json({
          title: 'Audit does not exist',
          error: {
            message: 'No access to audit'
          }
        })
      }
      else {
        req.paramAudit = audit;
        paramAudit = audit;
        next();
      }
    })
  } else {
    return res.status(401).json({
      title: 'Not authenticated',
      error: {
        message: 'No access to audit'
      }
    });
  }
}).get(auditStats, function(req, res) {
    res.status(201).json({
      message: 'Success',
      obj: req.auditStats
    });
}).post(function(req, res) {
}).put(function(req, res) {
  paramAudit.set({
    precinctNumber : req.body.precinctNumber
  });
  paramAudit.save(function(err, result){
    if (err) {
      return res.status(500).json({
        title: 'An error occurred while updating audit',
        error: err
      });
    }
    res.status(201).json({
      message: 'Pollingaudit updated',
      obj: result
    });
  });
}).delete(function(req, res) {
});

/* ALL with userId listing. */
router.route('/user/:userId') 
.all(async function(req, res, next) {
  userId = req.params.userId;
  // console.log('HEREEEEEEEE req.authedUser', req.authedUser)
  if (req.authedUser) {
    Schedule.find({
      userId: userId,
    }, async function(err, schedules) {
      if (err) {
        return status(500).json({
          title: 'An error occured',
          error: err
        })
      }
      else if (schedules === null) {
        return status(400).json({
          title: 'Resource Not Found',
          error: {
            message: 'No matching schedule'
          }
        })
      }
      else { // find active one and assign
        // let activeSched = schedules.find(async (sched) => {
        //   return await sched.active();
        // })

        async function getActiveSchedule(passedSchedules) {
          let activeSched;
          for (const schedule of passedSchedules) {
            if (await schedule.active()) {
              activeSched = schedule;
            }
            else {
              activeSched = undefined;
            }
          }
          return activeSched;
        }
        let activeSched = await getActiveSchedule(schedules);
        if (activeSched) {
          req.paramActiveSchedule = activeSched;
          Audit.findById(activeSched.auditId, function(err, audit){
            req.paramAudit = audit;
            next();
          })
        }
        else {
          return res.status(400).json({
            title: 'Resource Not Found',
            error: {
              message: 'No matching schedule'
            }
          });
        }
      }
    })
  } else {
    return res.status(401).json({
      title: 'Not authenticated',
      error: {
        message: 'No access to schedule'
      }
    });
  }
}).get(auditStats, function(req, res) {
  // console.log('req.activeSched', req.activeSched.auditId)
    res.status(201).json({
      message: 'Success',
      obj: req.auditStats
    });
}).post(function(req, res) {
}).put(function(req, res) {
  paramAudit.set({
    precinctNumber : req.body.precinctNumber
  });
  paramAudit.save(function(err, result){
    if (err) {
      return res.status(500).json({
        title: 'An error occurred while updating schedule',
        error: err
      });
    }
    res.status(201).json({
      message: 'Pollingschedule updated',
      obj: result
    });
  });
}).delete(function(req, res) {
  req.paramActiveSchedule.joinHistory.push({
    isMember: false,
    selfInitiated: true,
    date: Date.now()
  });
  console.log('authedUser.userRoles BEFORE role inactive', req.authedUser.userRoles)
  // ammend auditor role as inactive
  for (const auditRole of req.authedUser.userRoles) {
    if (auditRole.role = 'auditor') {
      auditRole.active = false;
      auditRole.inactivated.push({
        authenticatingUserId: req.paramAuthedUser._id,
        date: Date.now()
      });
      console.log('HEREHEREHEREHEREHERE', auditRole)
      break;
    }
  }
  console.log('authedUser.userRoles after role inactive', req.authedUser.userRoles)
  req.paramAuthedUser.save()
  .then(
  req.paramActiveSchedule.save(function(err, result){
    if (err) {
      return res.status(500).json({
        title: 'An error occurred while unjoining active audit schedule',
        error: err
      });
    }
    // console.log('result', result)
    res.status(201).json({
      message: 'Successfully left audit',
      obj: result
    });
  }))
});


/* ALL with auditId listing. */
// router.route('/audit/:auditId') 
// .all(async function(req, res, next) {
//   auditId = req.params.auditId;
//   // console.log('HEREEEEEEEE req.authedUser', req.authedUser)
//   if (req.authedUser) {
//     Audit.findById(auditId, function(err, audit) {
//       if (err) {
//         return status(500).json({
//           title: 'An error occured',
//           error: err
//         })
//       }
//       else if (audit === null) {
//         return status(500).json({
//           title: 'Not authenticated',
//           error: {
//             message: 'No access to schedules'
//           }
//         })
//       }
//       else {
//         req.paramAudit = audit;
//         next();
//       }
//     })
//   } else {
//     return res.status(401).json({
//       title: 'Not authenticated',
//       error: {
//         message: 'No access to schedule'
//       }
//     });
//   }
// }).get(auditStats, function(req, res) {
//     res.status(201).json({
//       message: 'Success',
//       obj: req.auditStats
//     });
// }).post(function(req, res) {
// }).put(function(req, res) {
//   paramAudit.set({
//     precinctNumber : req.body.precinctNumber
//   });
//   paramAudit.save(function(err, result){
//     if (err) {
//       return res.status(500).json({
//         title: 'An error occurred while updating schedule',
//         error: err
//       });
//     }
//     res.status(201).json({
//       message: 'Pollingschedule updated',
//       obj: result
//     });
//   });
// }).delete(function(req, res) {
//   req.paramAudit.remove();
//   res.status(201).json({
//     message: 'Success',
//     obj: null
//   });
// });

module.exports = router;
