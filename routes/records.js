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

// Models
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

module.exports = router;
