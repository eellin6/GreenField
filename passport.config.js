const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: '/auth/account/google'
  },
  passport.serializeUser(function(user, done) {
    done(null, user);
  }),
  passport.deserializeUser(function(user, done) {
    done(null, user);
  }),
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));
