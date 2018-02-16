var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Schedule = require('../models/schedule');
var Audit = require('../models/audit');

// ------------------- POST -------------------

/* CREATE NEW USER */
router.post('/add', function(req, res, next) { // handle if user exists already and is deactivated
  let user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    userRoles: {
      role: 'user',
      active: true,
      dateInitiated: Date.now(),
      dateActivated: Date.now(),
    },
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    exposeEmail: req.body.exposeEmail,
    phoneNumber: req.body.phoneNumber,
    exposePhoneNumber: req.body.exposePhoneNumber,
    age: req.body.age,
    exposeAge: req.body.exposeAge,
    sex: req.body.sex,
    exposeSex: req.body.exposeSex,
    partyAffiliation: req.body.partyAffiliation,
    otherPartyAffiliation: req.body.otherPartyAffiliation,
    exposePartyAffiliation: req.body.exposePartyAffiliation,
    // schedule: req.body.schedule
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

// ------------------- AUTH -------------------

///////// deal with user activity processes

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
        error: {message: 'Invalid login credentials OH MELISSA'}
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials PASSWORD'}
      });
    }
    if (!isUserFN(user.activeRoles)) {
      return res.status(401).json({
        title: 'Inactive account',
        error: {message: 'Would you like to reactivate your account?'}
      });
    }
    let userSterilized = JSON.parse(JSON.stringify(user));
    delete userSterilized.password;
    var token = jwt.sign({user: userSterilized}, 'secret', {expiresIn: 7200});
    res.status(200).json({
      message: 'Successfully logged in',
      token: token,
      // userId: user._id
    });
  })
})

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

/* AUTHED TO SEE SPECIFIC TEAM IN SCHEDULE WITH ELECTIONID AND POLLINGSTATIONID */
function authedForTeam(req, res, next){
  Audit.findOne({
    'electionId': req.params.electionId,
    'pollingStationId': req.params.pollingStationId
  })
  .exec(async (err, audit) => {
    if (audit === null) {
      return res.status(401).json({
        title: 'Not authenticated',
        error: {
          message: 'Audit inaccessible'
        }
      });
    }
    else if (err) {
      return res.status(401).json({
        title: 'An error occured',
        error: err
      });
    } 
    else {    
      let team = await audit.team;
      if (team.some((uId) => uId.equals(req.authedUser._id))) {
        next()
      } 
      else {
        return res.status(401).json({
            title: 'Not authenticated',
            error: {
              message: 'Team inaccessible'
            }
          });
      }
    }
  })
}

/* AUTHED TO SEE SPECIFIC TEAM IN SCHEDULE WITH AUDITID */
function authedForTeamWithAuditId(req, res, next){
  Audit.findOne({
    '_id': req.params.auditId
    })
  .exec(async (err, audit) => {
    if (audit === null) {
      return res.status(401).json({
        title: 'Not authenticated',
        error: {
          message: 'Audit inaccessible'
        }
      });
    }
    else if (err) {
      return res.status(401).json({
        title: 'Not authenticated',
        error: err
      });
    } 
    else {    
      let team = await audit.team;
      if (team.some((uId) => uId.equals(req.authedUser._id))) {
        next()
      } 
      else {
        return res.status(401).json({
            title: 'Not authenticated',
            error: {
              message: 'Team inaccessible'
            }
          });
      }
    }
  })
}

// ------------------- HELPER FUNCTIONS -------------------

function isSelfFN(passedUserId, authedUserID) { // pass in authed user -these cant use req
  return (passedUserId === authedUserID) ? true : false;
}

function isAdminFN(rolesArr) {
  return (rolesArr.includes('admin')) ? true : false;
}

function isUserFN(rolesArr) {
  return (rolesArr.includes('user')) ? true : false;
}

function isAuditorFN(rolesArr) {
  return (rolesArr.includes('auditor')) ? true : false;
}

function isLeadFN(rolesArr) {
  return (rolesArr.includes('lead')) ? true : false;
}

///////////////////////// authedForUserFN
async function authedForUserFN(passedUserId, authedUserSchedule) {
  let schedules;
  let audits = [];
  let auditArr = [];
  let teams = [];
  try {
    schedules = await Schedule.find({ '_id': authedUserSchedule})
  } catch (e) {
    console.error('could not find schedule:', e)
    return false;
  }
  schedules.forEach((sched) => {
    try {
      audit = sched.auditId;
      auditArr.push(audit);
    } 
    catch (e) {
      console.error('could not find audit:', e)
      return false;
    }
  })
  try {
    audits = await Audit.find({ '_id': auditArr});
  }
  catch(e) {
    console.error('could not find audits:', e)
    return false;
  }
  if (audits === null) {
      console.error('no audit(s)');
      return false;
  }
  else {
    audits.forEach((audit) => {
      let team = audit.team;
      teams.push(team);
    })
    const aggTeam = [].concat( ...await Promise.all(teams));
    return aggTeam.some((uId) => uId.equals(passedUserId));
  }
}

///////////////////////// returnTeamFN (userIds)
async function returnTeamFN(auditId) {
    let audit;
  try {
    audit = await Audit.findById(auditId);
  }
  catch(e) {
    console.error('An error occured:', e);
    return null;
  }
  try {
    let team = await audit.team;
    return team;
  }
  catch(e) {
    console.error('An error occured:', e);
    return null;
  }
}

///////////////////////// returnSterilizedUsers for lead or auditor
async function returnSterilizedUsers(userIdArr, activeRoles) {
  let users;
  try {
    users = await User.find({ '_id': userIdArr })
  }
  catch(e) {
    console.log('Error occured', e);
    return null;
  }
  let userArrSterilized = JSON.parse(JSON.stringify(users));
  userArrSterilized.forEach((us) => {
    delete us.password;
  });
  if (activeRoles.includes('lead')) {
    return userArrSterilized;
  }
  else {
    userArrSterilized.forEach((us) => {
      if (!us.exposeEmail){ delete us.emailAddress };
      if (!us.exposePhoneNumber){ delete us.phoneNumber };
    })
    return userArrSterilized;
  }
}

// ------------------- GET -------------------

/* GET ALL USERS AS ADMIN */
router.get('/all', isAdmin, function(req, res, next) {
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

/* GET ALL ACTIVE USERS AS ADMIN */
router.get('/all/active', isAdmin, function(req, res, next) {
  User.find({
    userRoles: {
      $elemMatch: {
        'role': 'user',
        'active': true
      }
    }
 })
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

/* GET ALL INACTIVE USERS AS ADMIN */
router.get('/all/inactive', isAdmin, function(req, res, next) {
  User.find({
    userRoles: {
      $elemMatch: {
        'role': 'user',
        'active': false
      }
    }
 })
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
router.get('/team/:auditId', isAuditor, authedForTeamWithAuditId, async function(req, res, next) {
  try {
    let team = await returnTeamFN(req.params.auditId);
    let users = await returnSterilizedUsers(team, req.authedUser.activeRoles);
    res.status(200).json({
      message: 'Success',
      obj: users
    });
  }
  catch(e) {
    return res.status(500).json({
      title: 'An error occurred',
      error: e
    });
  }
})

/* GET USERS IN TEAM AS AUDITOR OR LEAD */
router.get('/team/:electionId/:pollingStationId', isAuditor, authedForTeam, function(req, res, next) {
  Audit.findOne({
    electionId: req.params.electionId,
    pollingStationId: req.params.pollingStationId
  })
  .then(async (audit) => {
    let team = await audit.team;
    return team
  })
  .then(async (team) => {
    try {
      let users = await returnSterilizedUsers(team, req.authedUser.activeRoles);
      return res.status(200).json({
        message: 'Success',
        obj: users
      });
    }
    catch(e) {
      return res.status(500).json({
        title: 'An error occurred',
        error: e
      });
    }
  })
})



// ------------------- POST -------------------

// ------------------- PUT (REACTIVATE) -------------------

// ------------------- DELETE (MIGRATE TO NONUSER) -------------------


// ------------------- PUT (DEACTIVATE) -------------------


// ------------------- ALL (GET POST PUT DELETE) -------------------

/* ALL with volunteer_id listing. */
router.route('/:userId') 
.all(async function(req, res, next) {
  userId = req.params.userId;
  if (isSelfFN(userId, req.authedUser._id) || isAdminFN(req.authedUser.activeRoles) || await authedForUserFN(userId, req.authedUser.schedule)) {
    User.findById(userId, function(err, user) {
      if (err) {
        return status(500).json({
          title: 'An error occured',
          error: err
        })
      }
      else if (user === null) {
        return status(500).json({
          title: 'Not authenticated',
          error: {
            message: 'No access to user'
          }
        })
      }
      else {
        paramUser = user;
        next();
      }
    })
  } else {
    return res.status(401).json({
      title: 'Not authenticated',
      error: {
        message: 'No access to user'
      }
    });
  }
}).get(function(req, res) {
    res.status(201).json({
      message: 'Success',
      obj: paramUser
    });
}).post(function(req, res) {
    res.send('Post for paramUser ' + userId);
}).put(function(req, res) {
  paramUser.set({
    lastName : req.body.lastName
  });
  paramUser.save(function(err, result){
    if (err) {
      return res.status(500).json({
        title: 'An error occurred while updating user',
        error: err
      });
    }
    res.status(201).json({
      message: 'User updated',
      obj: result
    });
  });
  // res.status(201).json({
  //   message: 'Success',
  //   obj: paramUser
  // });
}).delete(function(req, res) {
  res.send('Delete for paramUser ' + userId);
});

module.exports = router;
