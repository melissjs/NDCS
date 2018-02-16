var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Election = require('../models/election');

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

/* GET ALL ELECTIONS */
router.get('/all', function(req, res, next) {
  Election.find({})
  .exec(function(err, elections) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(200).json({
      message: 'Success',
      obj: elections
    });
  });
});

module.exports = router;
