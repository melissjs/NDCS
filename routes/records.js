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
  console.log('HEREEEEEEEEEE')
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

/* GET ALL USERS AFFIDAVIT TOTAL */
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

module.exports = router;
