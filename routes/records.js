var express = require('express');
var router = express.Router();

// Models
var Affidavit = require('../models/affidavit');
var Amendment = require('../models/amendment');
var Anomaly = require('../models/anomaly');
var Demographics = require('../models/demographics');
var Officevote = require('../models/officevote');
var Vote = require('../models/vote');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a records resource');
});

module.exports = router;
