var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

// Models
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find()
    .exec(function(err, users) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: users
      });
    });
});

/* POST USER */
router.post('/add', function(req, res, next) {
  let user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  });
  user.save(function(err, result){
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'User created',
      obj: result
    });
  });
});


module.exports = router;
