var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
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

/* CREATE NEW USER */
router.post('/add', function(req, res, next) {
  let user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  });
  user.save(function(err, result){
    if (err) {
      return res.status(500).json({
        title: 'An error occurred while creating user',
        error: err
      });
    }
    res.status(201).json({
      message: 'User created',
      obj: result
    });
  });
});

/* SIGN IN USER */
router.post('/signin', function(req, res, next) {
  User.findOne({username: req.body.username}, function(err, user){
    if (err) {
      return res.status(500).json({
        title: 'An error occured while signing in user',
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
    res.status(200).json({
      message: 'Successfully logged in',
      token: token,
      userId: user._id
    });
  })
})

module.exports = router;
