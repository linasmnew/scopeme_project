import express from 'express';
import User from '../models/schemas/user';
const router = express.Router();
import validator from 'validator';
const crypto = require('crypto');

let postmark = require("postmark");
let client = new postmark.Client("your client id");



const passwordCreateValidation = (data) => {
  let validationErrors = {};

  if(data.newPassword !== data.newPasswordConfirm) validationErrors.newPasswordConfirm = "Passwords do not match";

  /* TODO: check if pass only consists of legit characters */

  //validation
  if(data.newPassword.length < 10) validationErrors.newPassword = "Password must consist of a minimum of 10 characters";
  if(data.newPassword.length > 50) validationErrors.newPassword = "Password exceeds the allowed character limit";

  if(data.newPasswordConfirm.length < 10) validationErrors.newPasswordConfirm = "Password must consist of a minimum of 10 characters";
  if(data.newPasswordConfirm.length > 50) validationErrors.newPasswordConfirm = "Password exceeds the allowed character limit";

  const isValid = Object.keys(validationErrors).length === 0;
  return { validationErrors, isValid };
};



router.get('/:token', (req, res, next) => {
  //req.params.token
  User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}).lean().exec((err, user) => {
    if(err) return next(err);
    if(!user) return res.status(400).json({email: "Password reset token is invalid or has expired"});

    return res.status(200).json({});
  });
});



router.post('/', (req, res, next) => {
  if(validator.isEmail(req.body.email)) {
    let token;
    crypto.randomBytes(20, (err, buf) => {
      token = buf.toString('hex');
    });

    User.findOne({"local.email": req.body.email}, {"_id": 1}, (err, user) => {
      if (err) return next(err);
      if (!user) return res.status(200).json({email: "If the entered email was correct you should receive an email with a reset link"});

      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; //1hr

      user.save(err => {
        if(err) return next(err);

        //send reset email to this user:
        client.sendEmail({
            "From": "support@scopeme.io",
            "To": req.body.email,
            "Subject": "Password Reset",
            "TextBody": 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'+
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://localhost:3000/reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        });

        return res.status(200).json({});
      });

    });

  } else {
    return res.status(400).json({errors: {email: 'Invalid email address provided'}});
  }
});



router.post('/:token', (req, res, next) => {

  const {validationErrors, isValid} = passwordCreateValidation(req.body);

  if(isValid) {

    User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}}, (err, user) => {
      if(err) return next(err);
      if(!user) return res.status(400).json({errors: {global: "Password reset token is invalid or has expired"}});

      user.local.password = user.hashPassword(req.body.newPassword);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      user.save(err => {
        if(err) return next(err);

        //send email, add promise.all
        let greeting = 'Hello, ';

        //check if user has added their full name to their bio
         if(user.bio && user.bio.fullName) {
           greeting = 'Hello, '+user.bio.fullName;
         }

        client.sendEmail({
            "From": "support@scopeme.io",
            "To": user.local.email,
            "Subject": "Your password has been changed",
            "TextBody": greeting + '\n\n' +
              'This is a confirmation that your password has been successfully changed.\n'
        });

        return res.status(200).json({});

      });
    });
  }else {
    return res.status(400).json({errors: validationErrors});
  }
});

export default router;
