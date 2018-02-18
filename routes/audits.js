var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Pollingstation = require('../models/pollingstation');
var Election = require('../models/election');
var Audit = require('../models/audit');
var User = require('../models/user');

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
    async function createAuditorTeam(passedUsers){
      for (const user of passedUsers) {
        let userSterilized = {};
        activeSched = await user.activeSchedule();
        userSterilized._id = user._id;
        userSterilized.firstName = user.firstName;
        userSterilized.lastName = user.lastName;
        userSterilized.userRoles = user.activeRoles;
        userSterilized.emailAddress = user.emailAddress;
        userSterilized.phoneNumber = user.phoneNumber;
        userSterilized.age = user.age;
        userSterilized.sex = user.sex;
        userSterilized.partyAffiliation = user.partyAffiliation;
        userSterilized.associatedPollingStationKey = reqAudit.pollingStationId;
        userSterilized.shifts = activeSched.shifts;
        userArrSterilized.push(userSterilized);
      }
    }
    await createAuditorTeam(users);
    if (reqUser.activeRoles.includes('lead') || reqUser.activeRoles.includes('admin')) {
      return userArrSterilized;
    }
    else {
      userArrSterilized.forEach((user) => {
        if (!user.exposeEmail){ delete user.emailAddress };
        if (!user.exposePhoneNumber){ delete user.phoneNumber };
        if (!user.exposeAge){ delete user.age };
        if (!user.exposeSex){ delete user.sex };
        if (!user.exposePartyAffiliation){ delete user.partyAffiliation };
      })
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
    try {
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
      pollingstation: req.paramAudit.pollingStationId,
      team: team,
      teamLength: teamIds.length,
      shifts: shiftsFilled
    };
    req.auditStats = auditStats;
    next();
  } 
  else {
    auditStats = {
      teamLength: teamIds.length,
      shifts: shiftsFilled
    }
    req.auditStats = auditStats;
    next()
  }
}

// ------------------- ALL (GET POST PUT DELETE) -------------------

/* ALL with volunteer_id listing. */
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
        return status(500).json({
          title: 'An error occured',
          error: err
        })
      }
      else if (audit === null) {
        return status(500).json({
          title: 'Not authenticated',
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
      // obj: paramAudit
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

module.exports = router;
