import express from 'express';
import User from '../../models/schemas/user';
const router = express.Router();
import Multer from 'multer';
import profileImageHandler from './profileImageHandler';
import { bioValidation, passwordChangeValidation, usernameValidation } from './profileValidation';


//get profile
router.get('/', (req, res, next) => {
  User.findById(req.user.id, { "_id": 0, "bio": 1, "local.email": 1, "username": 1 }).lean().exec((err, user) => {
    if (err) return next(err);
    return res.status(200).json(user);
  });
});

//update profile
router.post('/', (req, res, next) => {
  const {validationErrors, isValid} = bioValidation(req.body);
  if(isValid) {

    //think about using pormise.ALL here
    User.findByIdAndUpdate(req.user.id, {"bio.fullName": req.body.fullName, "bio.description": req.body.description, "local.email": req.body.email}, {new: true, select:{"_id": 0, "bio": 1, "local.email": 1}}).lean().exec((err, user) => {
      if (err) {
        if (err.code === 11000) {
          return res.status(400).json({errors: {email: "Email already registered"}});
        } else {
          return next(err);
        }
      }

          User.findByIdAndUpdate(req.user.id, {username: req.body.username}, {new: true, select: {'_id': 0, 'username': 1}}).lean().exec((err, updatedUsername) => {
            if (err) {
              if (err.code === 11000) {
                return res.status(400).json({errors: {username: "Username already exists"}});
              } else {
                return next(err);
              }
            }
            user.username = updatedUsername.username;
            return res.status(200).json(user);
          });

    });
  } else {
    return res.status(400).json({errors: validationErrors});
  }

});


router.delete('/', (req, res, next) => {
  User.findByIdAndRemove(req.user.id, (err, user) => {
    if(err) return next(err);
    req.logout();
    return res.status(200).json({});
  });
});



const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
};

//multer middleware parses the request and adds a file & body property
//to the request object, file contains the file,
//body contains regular fields if they were used in the same form submission
const multer = Multer({
  storage: Multer.MemoryStorage,
  //setting limits for security purposes
  limits: {
    fileSize: 2 * 1024 * 1024, //no larger than 2mb
    fields: 0, //max number of non-file fields
    files: 1, //for multipart forms, the max number of file fields
    parts: 1 //for multipart forms, the max number of parts (fields + files)
  },
  fileFilter: fileFilter
});


//we store file in multer, then upload it to google cloud storage and then
//store fileName in database and send it back to user
router.post('/photo', multer.single('image'), profileImageHandler.uploadToGcs, (req, res, next) => {
  //if we got to this stage we can assume the file has been verified and uploaded
  User.findByIdAndUpdate(req.user.id, {"bio.image": req.file.cloudStoragePublicUrl}, {new: true, select:{"_id": 0, "bio.image": 1}}).lean().exec((err, user) => {
    if (err) return next(err);
    return res.status(200).json(user);
  });
});


//create username
router.post('/username', (req, res, next) => {
  const {validationErrors, isValid} = usernameValidation(req.body.username);

  if(isValid) {
    User.findByIdAndUpdate(req.user.id, {username: req.body.username}, {new: true, select:{"_id": 0, "username": 1}}).lean().exec((err, user) => {
      if (err) {
        if (err.code === 11000) {
          return res.status(400).json({errors: {username: "Username already exists"}});
        } else {
          return next(err);
        }
      }
      return res.status(200).json(user);
    });
  } else {
    return res.status(400).json({errors: validationErrors});
  }
});



router.put('/change_password', (req, res, next) => {
  const {validationErrors, isValid} = passwordChangeValidation(req.body);
  const { oldPassword, newPassword, newPasswordConfirm } = req.body;

  if(isValid) {
    User.findById(req.user.id, (err, user) => {

      user.comparePassword(oldPassword, (err, isMatch) => {
        if (err) return next(err);
        if (!isMatch) return res.status(400).json({errors: {oldPassword: 'Invalid old password'}});

        user.local.password = user.hashPassword(newPassword);
        user.save(err => {
          if(err) return next(err);
          return res.status(200).json({});
        });

      });//end user comparePassword

    });//end user findById
  } else {
    return res.status(400).json({errors: validationErrors});
  }

});


export default router;
