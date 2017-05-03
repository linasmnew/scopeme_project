//npm modules
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import localStrategy from 'passport-local';


//user defined modules
import config from './models/config';
import guestUserRoutes from './routes/index';
import scopeRoutes from './routes/auth/scopes';
import profileRoutes from './routes/auth/profile';
import passwordResetRoutes from './routes/passwordReset';

import isAuthenticated from './auth/isAuthenticated';


mongoose.Promise = global.Promise;
/***********************************
      Establish database connection
***********************************/
mongoose.connect(config.dbUrl, {server: {socketOptions: {keepAlive: 120}}});


/***********************************
      Initialize express
***********************************/
const app = express();
app.set('port', (process.env.PORT || config.port));


/***********************************
      Parse request object middleware
***********************************/
app.use(cookieParser());
//remove this as not using forms anyway???
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '20kb'})); //default is 100kb222222222222

app.use(mongoSanitize());

app.use(session({
  secret: 'your_secret',
  name: 'session_name',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));


/***********************************
      Passport initialization
***********************************/
app.use(passport.initialize());
app.use(passport.session());

/***********************************
      Route middleware
***********************************/
app.use('/api/', guestUserRoutes);
app.use('/api/scopes', isAuthenticated, scopeRoutes);
app.use('/api/profile', isAuthenticated, profileRoutes);
app.use('/api/reset', passwordResetRoutes);

/***********************************
      Error handling middleware
***********************************/
//gets called when route is not found
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});


//dev error handler will print stack
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      console.log(err);
        res.status(err.status || 500).json({});
    });
}

//gets called when next(err) is called
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ errors: { global: "Something went wrong"} });
});

app.listen(app.get('port'), () => {
  console.log(`Listening at: http://localhost${app.get('port')}/`);
});
