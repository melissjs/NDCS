var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Pollingstation = require('../models/pollingstation');

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

/* GET ALL POLLINGSTATIONS */
router.get('/all', function(req, res, next) {
  Pollingstation.find({})
    .exec(function(err, stations) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: stations
      });
    });
});


// ------------------- POST -------------------

/* CREATE NEW USER */
router.post('/add', function(req, res, next) { // handle if user exists already and is deactivated
  let pollingstation = new Pollingstation({
    electionId: req.body.electionId,
    operative: req.body.operative,
    precinctNumber: req.body.precinctNumber,
    locationName: req.body.locationName,
    streetAddress: req.body.streetAddress,
    line1: req.body.line1,
    line2: req.body.line2,
    line3: req.body.line3,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    pollingHours: req.body.pollingHours,
    notes: req.body.notes
  });
  pollingstation.save(function(err, result){
    if (err) {
      return res.status(500).json({
        title: 'An error occurred while creating pollingstation',
        error: err
      });
    }
    res.status(201).json({
      message: 'Pollingstation created',
      obj: result
    });
  });
});

// ------------------- ALL (GET POST PUT DELETE) -------------------

/* ALL with volunteer_id listing. */
// router.route('/:userId') 
// .all(async function(req, res, next) {
//   userId = req.params.userId;
//   if (isSelfFN(userId, req.authedUser._id) || isAdminFN(req.authedUser.activeRoles) || await authedForUserFN(userId, req.authedUser.schedule)) {
//     User.findById(userId, function(err, user) {
//       if (err) {
//         return status(500).json({
//           title: 'An error occured',
//           error: err
//         })
//       }
//       else if (user === null) {
//         return status(500).json({
//           title: 'Not authenticated',
//           error: {
//             message: 'No access to user'
//           }
//         })
//       }
//       else {
//         paramUser = user;
//         next();
//       }
//     })
//   } else {
//     return res.status(401).json({
//       title: 'Not authenticated',
//       error: {
//         message: 'No access to user'
//       }
//     });
//   }
// }).get(function(req, res) {
//     res.status(201).json({
//       message: 'Success',
//       obj: paramUser
//     });
// }).post(function(req, res) {
//     res.send('Post for paramUser ' + userId);
// }).put(function(req, res) {
//   paramUser.set({
//     lastName : req.body.lastName
//   });
//   paramUser.save(function(err, result){
//     if (err) {
//       return res.status(500).json({
//         title: 'An error occurred while updating user',
//         error: err
//       });
//     }
//     res.status(201).json({
//       message: 'User updated',
//       obj: result
//     });
//   });
// }).delete(function(req, res) {
//   res.send('Delete for paramUser ' + userId);
// });

module.exports = router;
