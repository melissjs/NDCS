var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Resume = require('../models/resume');

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

/* GET ALL RESUMES */
router.get('/all', function(req, res, next) {
  if (req.authedUser.activeRoles.includes('admin')) {
    Resume.find({})
      .exec(function(err, resumes) {
        if (err) {
          return res.status(500).json({
            title: 'An error occurred',
            error: err
          });
        }
        res.status(200).json({
          message: 'Success',
          obj: resumes
        });
      });
  }
  else {
    return res.status(401).json({
      title: 'Not authenticated',
      error: {
        message: 'No access to resume'
      }
    });
  }
});

/* GET RESUME FOR CERTAIN USER */
router.get('/resumes/user/:userId', function(req, res, next) {
  userId = req.params.userId;
  Resume.findOne({
    userId: userId
  })
    .exec(function(err, resume) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: resume
      });
    });
});

// ------------------- POST -------------------

/* CREATE NEW USER */
router.post('/add', function(req, res, next) { // handle if user exists already and is deactivated
  let resume = new Resume({
    userId: req.body.userId,
    roleRequests: req.body.roleRequests,
    shortBio: req.body.shortBio,
    preferredContact: req.body.preferredContact,
    references: req.body.references,
    facebook: req.body.facebook,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
    linkedin: req.body.linkedin,
    website: req.body.website,
    resume: req.body.resume,
    areasOfExpertise: req.body.areasOfExpertise,
    relatedExperience: req.body.relatedExperience,
    otherLinks: req.body.otherLinks
  });
  resume.save(function(err, result){
    if (err) {
      return res.status(500).json({
        title: 'An error occurred while creating resume',
        error: err
      });
    }
    res.status(201).json({
      message: 'Resume created',
      obj: result
    });
  });
});

// ------------------- ALL (GET POST PUT DELETE) -------------------

/* ALL with pollingstationId listing. */
// router.route('/pollingstation/:pollingstationId')
// .all(async function(req, res, next) {
//   console.log('hiTTing')
//   pollingstationId = req.params.pollingstationId;
//   console.log('HEREEEEEEEE req.authedUser', req.authedUser)

//   if (req.authedUser.activeRoles.includes('user')) {
//     Pollingstation.findById(pollingstationId, function(err, station) {
//       if (err) {
//         return status(500).json({
//           title: 'An error occured',
//           error: err
//         })
//       }
//       else if (station === null) {
//         return status(500).json({
//           title: 'Not authenticated',
//           error: {
//             message: 'No access to station'
//           }
//         })
//       }
//       else {
//         paramPollingstation = station;
//         next();
//       }
//     })
//   } else {
//     return res.status(401).json({
//       title: 'Not authenticated',
//       error: {
//         message: 'No access to station'
//       }
//     });
//   }
// }).get(function(req, res) {
//     res.status(201).json({
//       message: 'Success',
//       obj: paramPollingstation
//     });
// }).post(function(req, res) {
//     // res.send('Post for paramPollingstation ' + pollingstationId);
// }).put(function(req, res) {
//   console.log('HEREEEEEEEE')
//   paramPollingstation.set({
//     precinctNumber : req.body.precinctNumber
//   });
//   paramPollingstation.save(function(err, result){
//     if (err) {
//       return res.status(500).json({
//         title: 'An error occurred while updating station',
//         error: err
//       });
//     }
//     res.status(201).json({
//       message: 'Pollingstation updated',
//       obj: result
//     });
//   });
// }).delete(function(req, res) {
//   // res.send('Delete for paramPollingstation ' + pollingstationId);
// });

module.exports = router;
