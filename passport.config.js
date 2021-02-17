const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: '/auth/google/callback'
},
function(accessToken, refreshToken, profile, done) {
  console.log(profile);
  done(null, profile);
}
));
