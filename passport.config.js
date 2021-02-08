const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:3000/api/account/google"
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
