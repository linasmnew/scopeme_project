import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/schemas/user';
import validator from 'validator';


const signupValidation = (data) => {
  let validationErrors = {};

  if(!validator.isEmail(data.email)) validationErrors.email = 'Invalid email address provided';

  if(data.password.length < 10) validationErrors.password = "Password must consist of a minimum of 10 characters";
  if(data.password.length > 50) validationErrors.password = "Password exceeds the allowed character limit";

  const isValid = Object.keys(validationErrors).length === 0;
  return { validationErrors, isValid };
};



passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true //allows us to pass the entire request to the callback
},
  (req, email, password, callback) => {

  const {validationErrors, isValid} = signupValidation({email, password});

  if(isValid) {
    //asynchronous
    process.nextTick(() => {

      User.findOne({'local.email': email}, (err, existingUser) => {
        if (err) return callback(err);
        if (existingUser) return callback(null, false);

        let newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.hashPassword(password);

        newUser.save((err) => {
          if(err) return callback(err);

          return callback(null, newUser);
        });

      });//end findone

    });//end nextTick
  //end of isValid
  } else {
    return callback(null, false, validationErrors);
  }

  }//end LocalStrategy cb
));


passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
(req, email, password, callback) => {

  const {validationErrors, isValid} = signupValidation({email, password});

  if(isValid) {
    User.findOne({'local.email': email}, (err, user) => {
      if (err) return callback(err);
      if (!user) return callback(null, false);

      user.comparePassword(password, (err, isMatch) => {
        if (err) return callback(err);
        if (!isMatch) return callback(null, false);

        //all is well, can return successful user
        return callback(null, user);
      });

    });//end findOne
  } else {
    return callback(null, false, validationErrors);
  }

}//end LocalStrategy cb
));




export default {
  local: {
    signup: function(req, res, next) {

      passport.authenticate('local-signup', (err, user, info) => {
        if (err) return next(err);

        //if user details are missing passport doesn't execute the strategie's
        //callback, and instead returns missing credentials in passport.authenticate (here)
        //so to return a custom validation message we have to overwrite it here
        if(req.body.email === '' && req.body.password === '') {
          return res.status(400).json({errors: {email: 'Please enter your email address', password: 'Please create a password'}});
        }
        if(req.body.email === '') {
          return res.status(400).json({errors: {email: 'Please enter your email address'}});
        }
        if(req.body.password === '') {
          return res.status(400).json({errors: {password: 'Please create a password'}});
        }

        //return error messages defined by validation function
        if (typeof info !== 'undefined') {
          return res.status(400).json({errors: info});
        }

        if (!user) return res.status(400).json({errors: {email: 'Email already exists'}});

        req.login(user, (err) => {
          if(err) return next(err);

          return res.status(200).json({});
        });
      })(req, res, next);

    },
    login: function(req, res, next) {
      passport.authenticate('local-login', (err, user, info) => {
        if (err) return next(err);
        if (!user)  return res.status(400).json({errors: {global: 'Invalid email password combination'}});

        req.login(user, (err) => {
          if(err) return next(err);
          return res.status(200).json({});
        });

    })(req, res, next);

  }
}
};
