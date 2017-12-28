var express = require('express');
var router = express.Router();

// Models
var Candidate = require('../models/candidate');
var Electoffice = require('../models/electoffice');
var Pollingstation = require('../models/pollingstation');

/* GET election listing. */
router.get('/', function(req, res, next) {
  res.send('respond with an elections resource, like office or candidates');
});

module.exports = router;
