const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "722057395339-g7v9oabfk4mlpo5b1lbf337fo4qoo0ma.apps.googleusercontent.com",
    clientSecret: "WDQtpHSGODE12fue8u5nBGu8",
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
