import express from 'express';
import User from '../models/schemas/user';
import auth from '../auth/setup';
const router = express.Router();
import validator from 'validator';

router.post('/signup', (req, res, next) => {
    auth.local.signup(req, res, next);
});

router.post('/login', (req, res, next) => {
    auth.local.login(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).json({});
});

router.get('/auth/check', (req, res) => {
  if(req.isAuthenticated()) {
    return res.status(200).json();
  }else{
    return res.status(401).json();
  }
});




router.get('/user/:username', (req, res, next) => {
  User.findOne({username: req.params.username}, { "_id": 0, "bio.fullName": 1, "username": 1}).lean().exec((err, user) => {
    if (err) return next(err);
    if(!user) return res.status(404).json();
    return res.status(200).json(user);
  });
});

//we can use custom endpoint names because it's an epi endpoint
//it won't be displayed in the url anyway
router.get('/user/bio/:username', (req, res, next) => {
  if(req.params.username || req.body.username) {

    User.findOne({username: req.params.username}, { "_id": 0, "bio": 1, "username": 1}).lean().exec((err, user) => {
      if (err) return next(err);
      if(!user) return res.status(404).json();
      return res.status(200).json(user);
    });

  } else {
    return res.status(400).json({"errors": "invalid request"});
  }

});



router.get('/user/scopes/:username', (req, res, next) => {

  if(req.params.username || req.body.username) {

    User.aggregate([{
        "$match": {
            "username": req.params.username
        }
    }, {
        "$unwind": "$Scopes"
    }, {
        "$sort": {
            "Scopes.createdAt": -1
        }
    }, {
      "$group": {
        "Scopes": {
          "$push": "$Scopes"
        },
        "_id": 1
      }
    },{
        "$project": {
            "Scopes": {
              "siteName": 1,
              "link": 1,
              "backgroundColor": 1,
              "textColor": 1,
              "_id": 1
            },
            "_id": 0
        }
    }], (err, scopes) => {
      if (err) return next(err);
      if(scopes.length === 0) return res.status(200).json([]);
      return res.status(200).json(scopes[0].Scopes);
    });

  } else {
    return res.status(400).json({"errors": "invalid request"});
  }

});



export default router;
