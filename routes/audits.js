var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Pollingstation = require('../models/pollingstation');
var Election = require('../models/election');
var Audit = require('../models/audit');


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

// ------------------- MIDDLEWARE -------------------

/* RETURNS AUDIT STATS FOR TEAM MEMBER (ACCESS TO TEAM) OR INTERESTED PARTY (NO TEAM ACCESS) */
const auditStats = async(req, res, next) => {
  let team;
  let shiftsFilled;
  let auditStats;
  try {
    team = await req.paramAudit.getTeam();
    shiftsFilled = await req.paramAudit.getShiftsFilled();
  }
  catch(e) {
    console.log('Error occured', e);
    return null;
  }
  if (team.some((uId) => uId.equals(req.authedUser._id))) {
    auditStats = {
      _id: req.paramAudit._ud,
      election: req.paramAudit.electionId,
      pollingstation: req.paramAudit.pollingstationId,
      team: team, // sanitize this for auditor model
      teamLength: team.length,
      shifts: shiftsFilled
    };
    req.auditStats = auditStats;
    next();
  } 
  else {
    auditStats = {
      teamLength: team.length,
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
    // res.send('Post for paramAudit ' + pollingauditId);
}).put(function(req, res) {
  console.log('HEREEEEEEEE')
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
  // res.send('Delete for paramAudit ' + pollingauditId);
});

module.exports = router;
