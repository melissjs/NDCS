var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Schedule = require('../models/schedule');

// ------------------- AUTH -------------------

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
        error: {message: 'Invalid login credentials NO USER'}
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials PASSWORD'}
      });
    }
    let userSterilized = JSON.parse(JSON.stringify(user));
    delete userSterilized.password;
    var token = jwt.sign({user: userSterilized}, 'secret', {expiresIn: 7200});
    res.status(200).json({
      message: 'Successfully logged in',
      token: token,
      userId: user._id
    });
  })
})

// ------------------- AUTH WITH JWT -------------------

/* VALIDATE AUTHORIZATION HEADER THEN APPEND USER TO REQ */
router.use('/', function(req, res, next) {
  jwt.verify(req.headers.authorization, 'secret', function(err, decoded) {
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

// ------------------- ROLE MIDDLEWARE -------------------

/* IS ADMIN */
function isAdmin(req, res, next){
  if (req.authedUser.activeRoles.includes('admin')) {
    next()
  } else {
    return res.status(401).json({
      title: 'Not authenticated',
      error: {
        message: 'Higher access level required'
      }
    })
  }
}

/* IS VOLUNTEER */
function isVolunteer(req, res, next){
  if (req.authedUser.activeRoles.includes('volunteer')) {
    next()
  } else {
    return res.status(401).json({
      title: 'Not authenticated',
      error: {
        message: 'Higher access level required'
      }
    });
  }
}

/* IS AUDITOR */
function isAuditor(req, res, next){
  if (req.authedUser.activeRoles.includes('auditor')) {
    next()
  } else {
    return res.status(401).json({
      title: 'Not authenticated',
      error: {
        message: 'Higher access level required'
      }
    });
  }
}

/* IS LEAD */
function isLead(req, res, next){
  if (req.authedUser.activeRoles.includes('lead')) {
    next()
  } else {
    return res.status(401).json({
      title: 'Not authenticated',
      error: {
        message: 'Higher access level required'
      }
    });
  }
}

/* AUTHED TO SEE SPECIFIC TEAM IN SCHEDULE */
// populate users schedule, see if electionID and pollingStationId pair is in schedule array
function authedForTeam(req, res, next){
  let ans = false;
  req.authedUser.schedule.forEach((scheduleId) => {
    Schedule.findById(scheduleId)
    .then((schedule) => {
      if (schedule.electionId.toString() === req.params.electionId && schedule.pollingStationId.toString() === req.params.pollingStationId) {
        ans =(ans || true);
        console.log(ans)
      } else {
        null
      }
    })
    .then(() => {
      if (ans) {
        next()
      } else {
        return res.status(401).json({
          title: 'Not authenticated',
          error: {
            message: 'Team inaccessible'
          }
        });
      }
    })
  })
}

// ------------------- HELPER FUNCTIONS -------------------

function isSelf(passedUserId) {
  return (passedUserId === req.authedUser._id) ? true : false;
}

function isAdmin() {
  return (req.authedUser.activeRoles.includes('admin')) ? true : false;
}

function isAuditor() {
  return (req.authedUser.activeRoles.includes('auditor')) ? true : false;
}

function isLead() {
  return (req.authedUser.activeRoles.includes('lead')) ? true : false;
}

function authedForUser(passedUserId) {
  let aggregatedTeamMembers = [];
  req.authedUser.schedule.forEach((scheduleObj) => {
    Pollingstation.findById(scheduleObj.pollingStationId)
    .then((station) => {
      station.current
    })
  })
}

// ------------------- GET -------------------

/* GET ALL USERS AS ADMIN */
router.get('/', isAdmin, function(req, res, next) {
  User.find({})
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

/* GET USERS WITH VOLUNTEER ROLE AS ADMIN */
router.get('/volunteers', isAdmin, function(req, res, next) {
  User.find({ 'userRoles.role': 'volunteer' })
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

/* GET USERS WITH LEAD ROLE AS ADMIN */
router.get('/leads', isAdmin, function(req, res, next) {
  User.find({ 'userRoles.role': 'lead' })
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

/* GET USERS WITH ADMIN ROLE AS ADMIN */
router.get('/admins', isAdmin, function(req, res, next) {
  User.find({ 'userRoles.role': 'admin' })
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


/* GET USERS IN TEAM AS AUDITOR OR LEAD */
router.get('/team/:electionId/:pollingStationId', isAuditor, authedForTeam, function(req, res, next) {
  Schedule.find({
    pollingStationId: req.params.pollingStationId,
    electionId: req.params.electionId
  })
    .populate({
      path: 'userId',
      model: 'User'
    })
    .exec(function(err, users) {
      let userArr = [];
      users.forEach((u) => {
        userArr.push(u.userId);
      });
      let userArrSterilized = JSON.parse(JSON.stringify(userArr));
      userArrSterilized.forEach((us) => {
        delete us.password;
      });
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      if (req.authedUser.activeRoles.includes('lead')) {
        res.status(200).json({
          message: 'Success',
          obj: userArrSterilized
        });
      }
      else {
        userArrSterilized.forEach((us) => {
          if (!us.exposeEmail){ delete us.emailAddress };
          if (!us.exposePhoneNumber){ delete us.phoneNumber };
        })
        res.status(200).json({
          message: 'Success',
          obj: userArrSterilized
        });
      }
    });
});

// ------------------- POST -------------------

/* CREATE NEW USER */
router.post('/add', function(req, res, next) {
  let user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    userRoles: req.body.userRoles,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    phoneNumber: req.body.phoneNumber,
    exposeEmail: req.body.exposeEmail,
    exposePhoneNumber: req.body.exposePhoneNumber,
    age: req.body.age,
    sex: req.body.sex,
    partyAffiliation: req.body.partyAffiliation,
    schedule: req.body.schedule
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

// ------------------- ALL (GET POST PUT DELETE) -------------------

/* ALL with volunteer_id listing. */
router.route('/:userId') 
.all(function(req, res, next) {
    userId = req.params.userId;
    User.findById(userId, function(err, user) {
      if (err) {
        return status(500).json({
          title: 'An error occured',
          error: err
        })
      }
      paramUser = user;
      next();
    })
}).get(function(req, res) {
    // res.send('Get for paramUser ' + userId + paramUser.firstName   );
    res.status(201).json({
      message: 'Success',
      obj: paramUser
    });
}).post(function(req, res) {
    res.send('Post for paramUser ' + userId);
}).put(function(req, res) {
  res.send('Put for paramUser ' + userId);
}).delete(function(req, res) {
  res.send('Delete for paramUser ' + userId);
});

module.exports = router;
