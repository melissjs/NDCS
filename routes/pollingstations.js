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

/* GET ALL POLLINGSTATIONS FOR CERTAIN ELECTIOIN */
router.get('/election/:electionId/operative', function(req, res, next) {
  electionId = req.params.electionId;
  Pollingstation.find({
    operative: true,
    electionId: [electionId]
  })
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
router.route('pollingstation/:pollingstationId') 
.all(async function(req, res, next) {
  pollingstationId = req.params.pollingstationId;
  console.log('HEREEEEEEEE req.authedUser', req.authedUser)

  if (req.authedUser.activeRoles.includes('admin')) {
    Pollingstation.findById(pollingstationId, function(err, station) {
      if (err) {
        return status(500).json({
          title: 'An error occured',
          error: err
        })
      }
      else if (station === null) {
        return status(500).json({
          title: 'Not authenticated',
          error: {
            message: 'No access to station'
          }
        })
      }
      else {
        paramPollingstation = station;
        next();
      }
    })
  } else {
    return res.status(401).json({
      title: 'Not authenticated',
      error: {
        message: 'No access to station'
      }
    });
  }
}).get(function(req, res) {
    res.status(201).json({
      message: 'Success',
      obj: paramPollingstation
    });
}).post(function(req, res) {
    // res.send('Post for paramPollingstation ' + pollingstationId);
}).put(function(req, res) {
  console.log('HEREEEEEEEE')
  paramPollingstation.set({
    precinctNumber : req.body.precinctNumber
  });
  paramPollingstation.save(function(err, result){
    if (err) {
      return res.status(500).json({
        title: 'An error occurred while updating station',
        error: err
      });
    }
    res.status(201).json({
      message: 'Pollingstation updated',
      obj: result
    });
  });
}).delete(function(req, res) {
  // res.send('Delete for paramPollingstation ' + pollingstationId);
});

module.exports = router;
