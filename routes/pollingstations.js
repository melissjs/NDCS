var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Pollingstation = require('../models/pollingstation');


// ------------------- POST -------------------

/* CREATE NEW USER */
// router.post('/add', function(req, res, next) { // handle if user exists already and is deactivated
//   let user = new User({
//     username: req.body.username,
//     password: bcrypt.hashSync(req.body.password, 10),
//     userRoles: {
//       role: 'user',
//       active: true,
//       dateInitiated: Date.now(),
//       dateActivated: Date.now(),
//     },
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     emailAddress: req.body.emailAddress,
//     exposeEmail: req.body.exposeEmail,
//     phoneNumber: req.body.phoneNumber,
//     exposePhoneNumber: req.body.exposePhoneNumber,
//     age: req.body.age,
//     exposeAge: req.body.exposeAge,
//     sex: req.body.sex,
//     exposeSex: req.body.exposeSex,
//     partyAffiliation: req.body.partyAffiliation,
//     otherPartyAffiliation: req.body.otherPartyAffiliation,
//     exposePartyAffiliation: req.body.exposePartyAffiliation,
//     // schedule: req.body.schedule
//   });
//   user.save(function(err, result){
//     if (err) {
//       return res.status(500).json({
//         title: 'An error occurred while creating user',
//         error: err
//       });
//     }
//     res.status(201).json({
//       message: 'User created',
//       obj: result
//     });
//   });
// });

// ------------------- AUTH WITH JWT -------------------

/* VALIDATE AUTHORIZATION HEADER THEN APPEND USER TO REQ */
// router.use('/', function(req, res, next) {
//   let token = req.headers.authorization.split(' ')[1]
//   jwt.verify(token, 'secret', function(err, decoded) {
//     if (err) {
//       return res.status(401).json({
//         title: 'Not authenticated',
//         error: err
//       });
//     }
//     req.authedUser = decoded.user;
//     next();
//   });
// });

// ------------------- GET -------------------

/* GET ALL USERS AS ADMIN */
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

// ------------------- PUT (REACTIVATE) -------------------

// ------------------- DELETE (MIGRATE TO NONUSER) -------------------


// ------------------- PUT (DEACTIVATE) -------------------


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
