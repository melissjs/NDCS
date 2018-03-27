var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// var Pollingstation = require('../models/pollingstation');
// var Election = require('../models/election');
var Audit = require('../models/audit');
var User = require('../models/user');
var Affidavit = require('../models/affidavit');
var Amendment = require('../models/amendment');
var Anomaly = require('../models/anomaly');
var Demographics = require('../models/demographics');
var Officevote = require('../models/officevote');
var Vote = require('../models/vote');

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

/* GET ALL AFFIDAVIT TOTAL */
router.get('/affidavit/all', function(req, res, next) {
  Affidavit.find({})
    .exec(function(err, affidavits) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred while finding affidavits',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: affidavits.length
      });
    });
});

/* GET ALL AMMENDMENT TOTAL */
router.get('/ammendment/all', function(req, res, next) {
  Amendment.find({})
    .exec(function(err, ammendments) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred while finding ammendments',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: ammendments.length
      });
    });
});

/* GET ALL ANOMALY TOTAL */
router.get('/anomaly/all', function(req, res, next) {
  Amendment.find({})
    .exec(function(err, anomalys) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred while finding anomalys',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: anomalys.length
      });
    });
});

// ------------------- POST -------------------

/* CREATE NEW AFFIDAVIT */
router.post('/affidavit/add', function(req, res, next) {
  let affidavit = new Affidavit({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    consent: req.body.consent,
    locationName: req.body.locationName,
    streetAddress: req.body.streetAddress,
    zip: req.body.zip,
    emailAddress: req.body.emailAddress,
    comments: req.body.comments,
    volunteerId: req.body.volunteerId,
    electionId: req.body.electionId,
    timestamp: req.body.timestamp
  });
  affidavit.save(function(err, result){
    if (err) {
      return res.status(500).json({
        title: 'An error occurred while creating affidavit',
        error: err
      });
    }
    res.status(201).json({
      message: 'Affidavit created',
      obj: result
    });
  });
});

module.exports = router;
