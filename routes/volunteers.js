var express = require('express');
var router = express.Router();
var Volunteer = require('../models/volunteer');

/* GET volunteers listing. */
router.get('/', function(req, res, next) {
    Volunteer.find( function(err, volunteers, count) {
        // res.send('respond with a volunteer resource' + volunteers);
        res.send(volunteers);        
    })
});

// add volunteer
router.route('/add')
  .post(function(req, res) {
    new Volunteer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    }).save(function(err, volunteer, count) {
        if(err) {
            res.status(400).send('Error saving Volunteer: ' + err);
        } else {
            res.send('Volunteer created');
        }
    })
  });

/* POST volunteers listing. */
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
      res.send('Get for volunteer ' + volunteer_id + volunteer.firstName);
  }).post(function(req, res) {
      res.send('Post for volunteer ' + volunteer_id);
  }).put(function(req, res) {
    res.send('Put for volunteer ' + volunteer_id);
  }).delete(function(req, res) {
    res.send('Delete for volunteer ' + volunteer_id);
  });

module.exports = router;
