//scopes CRUD
import express from 'express';
import User from '../../models/schemas/user';
const router = express.Router();
import validator from 'validator';
import mongoose from 'mongoose';

const isRgb = (color) => {
  let matcher = /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*[\d\.]+)?\s*\)$/;
  return matcher.test(color);
}

const scopeValidation = (data) => {
  //siteName, backgroundColor, textColor, link, siteName
  let validationErrors = {};

  //sanitization to normalize input before running it through validation
  validator.trim(data.siteName);
  validator.trim(data.backgroundColor);
  validator.trim(data.textColor);
  validator.trim(data.link);
  validator.escape(data.siteName);

  //validation
  if(data.siteName.length > 24) validationErrors.siteName = 'Site name exceeded 24 characters';
  if(!validator.isURL(data.link)) validationErrors.link = 'Invalid site url'
  //else we just use default color client side
  if(data.backgroundColor !== '') {
    if(!validator.isHexColor(data.backgroundColor) && !isRgb(data.backgroundColor)) {
      validationErrors.backgroundColor = 'Invalid color code';
    }
  }

  if(data.textColor !== '') {
    if(!validator.isHexColor(data.textColor) && !isRgb(data.textColor)) {
      validationErrors.textColor = 'Invalid color code';
    }
  }

  if(validator.isEmpty(data.siteName)) validationErrors.siteName = 'Please enter a site name';
  if(validator.isEmpty(data.link)) validationErrors.link = 'Please enter link';

  const isValid = Object.keys(validationErrors).length === 0;
  return { validationErrors, isValid };
};




//Read all scopes
router.get('/', (req, res, next) => {

  User.aggregate([{
      "$match": {
          "_id": new mongoose.mongo.ObjectId(req.user.id)
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

});


router.get('/:id', (req, res, next) => {
  if(validator.isMongoId(req.params.id)) {
    User.findOne({_id: req.user.id, "Scopes._id": req.params.id}, {"_id": 0, "Scopes.$": 1}).lean().exec((err, user) => {
      if (err) return next(err);
      if(user.Scopes.length === 0) return res.status(200).json([]);

      delete user.Scopes[0].createdAt;
      return res.status(200).json(user.Scopes[0]);
    });
  } else {
    return res.status(404).send();
  }
});


router.post('/', (req, res, next) => {
  const {validationErrors, isValid} = scopeValidation(req.body);

  if (isValid) {

    User.findOneAndUpdate({_id: req.user.id},
    { $push: {Scopes: req.body} },
    {new: true}
  ).lean().exec((err, user) => {
      if (err) return next(err);
      return res.status(200).json(user.Scopes[user.Scopes.length-1]);
    });

  } else {
    return res.status(400).json({errors: validationErrors});
  }

});



router.put('/:id', (req, res, next) => {
  if(validator.isMongoId(req.params.id)) {

    const {validationErrors, isValid} = scopeValidation(req.body);

    if(validationErrors) {
      //$ stands as a placeholder of the index found by the query
      User.findOneAndUpdate(
        {
          "_id": req.user.id,
          "Scopes._id": req.params.id
        },
        {$set: {
            "Scopes.$.siteName": req.body.siteName,
            "Scopes.$.link": req.body.link,
            "Scopes.$.backgroundColor": req.body.backgroundColor,
            "Scopes.$.textColor": req.body.textColor
          }
        }, {
          "projection": {
            "Scopes": {
              "$elemMatch": {"_id": req.params.id}
            },
            "Scopes.createdAt": 0
          },
          new: true,
        }).lean().exec((err, user) => {
        if (err) return next(err);

        if(user.Scopes.length === 0) return res.status(400).json({errors: {scope:"Invalid id provided"}});
        return res.status(200).json(user.Scopes[0]);
      });

    } else {
      return res.status(400).json({errors: validationErrors});
    }
  } else {
    return res.status(400).json({errors: {scope: "Invalid id provided"}});
  }
});


//Delete scope
router.delete('/:id', (req, res, next) => {
  if(validator.isMongoId(req.params.id)) {
    User.findOneAndUpdate({_id: req.user.id},
      { $pull: {Scopes: {_id: req.params.id}} }).lean().exec((err, user) => {
        if (err) return next(err);
        res.status(200).json({});
      });
  }else {
    return res.status(400).json({errors: {scope: "Invalid id provided"}});
  }
});





export default router;
