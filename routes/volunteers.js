var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
// Models
var Volunteer = require('../models/volunteer');
var User = require('../models/user');
var Timesheet = require('../models/timesheet');

/* GET VOLUNTEERS*/
// router.get('/', function(req, res, next) {
//     Volunteer.find( function(err, volunteers, count) {
//         // res.send('respond with a volunteer resource' + volunteers);
//         res.send(volunteers);        
//     })
// });

/* VALIDATE AUTHORIZATION QUERY STRING */
// router.use('/', function(req, res, next) {
//   jwt.verify(req.query.token, 'secret', function(err, decoded) {
//     if (err) {
//       return res.status(401).json({
//         title: 'Not authenticated',
//         error: err
//       });
//     }
//     next();
//   });
// });

/* VALIDATE AUTHORIZATION HEADER*/
router.use('/', function(req, res, next) {
  jwt.verify(req.headers.authorization, 'secret', function(err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'Not authenticated',
        error: err
      });
    }
    next();
  });
});

// // tryyyyyy
router.get('/', function(req, res, next) {
  Volunteer.find()
    .exec(function(err, volunteers) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: volunteers
      });
    });
});

// add volunteer
router.route('/add')
  .post(function(req, res) {    
    new Volunteer({
        volunteerKey: req.body.volunteerKey,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        exposeEmail: req.body.exposeEmail,
        phoneNumber: req.body.phoneNumber,
        age: req.body.age,
        sex: req.body.sex,
        partyAffiliation: req.body.partyAffiliation,
        shifts: req.body.shifts,
        associatePollingStationKey: req.body.associatePollingStationKey
    }).save(function(err, volunteer, count) {
        if(err) {
            res.status(400).json('Error saving Volunteer: ' + err);
        } else {
            res.status(200).json('Volunteer created: ' + volunteer.firstName);
            // res.status(201).json({
            //   message: "volunteer saved",
            //   volunteer: volunteer
            // })
        }
    })
  });

/* POST volunteers listing. */
// for all volunteers in users team only
router.post('/', function(req, res, next) {
    res.send('posted volunteer resource');
  });

/* ALL with volunteer_id listing. */
router.route('/:volunteer_id') 
  .all(function(req, res, next) {
      volunteer_id = req.params.volunteer_id;
      Volunteer.findById(volunteer_id, function(err, v) {
        volunteer = v;
        next();
      })
  }).get(function(req, res) {
      res.send('Get for volunteer ' + volunteer_id + volunteer.firstName   );
  }).post(function(req, res) {
      res.send('Post for volunteer ' + volunteer_id);
  }).put(function(req, res) {
    res.send('Put for volunteer ' + volunteer_id);
  }).delete(function(req, res) {
    res.send('Delete for volunteer ' + volunteer_id);
  });

module.exports = router;
