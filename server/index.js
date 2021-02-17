/* eslint-disable camelcase */
const passport = require('passport');
const cloudinary = require('cloudinary');
const flash = require('express-flash');
const session = require('express-session');
const cors = require('cors');
const formData = require('express-form-data');
const { GoogleStrategy } = require('../passport.config.js');
const { User, Favorites, Markers, Comments } = require('./db/database.js');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const Documenu = require('documenu');
const { Flights } = require('./api/flights');
const { Search } = require('./api/search');

require('dotenv').config();
require('../passport.config');
app.set('view engine', 'ejs');
//changed extended to false to work with form data;allows data to be in req body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(bodyParser.json());
app.use(cookieSession({ name: 'google-auth-session', keys: ['key1', 'key2']}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(cors());
app.use(flash());
app.use(formData.parse());
app.use(session({
  secret: process.env.clientSecret,
  resave: true, //should we resave if nothing changes
  saveUninitialized: false // do we want to save empty value
}));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const comments = require('./routes/comments');
const favorites = require('./routes/favorites');
const markers = require('./routes/markers');
const photos = require('./routes/photos');
const user = require('./routes/user');
// const flights = require('./routes/flights');

app.use('/comments', comments);
app.use('/users', user);
app.use('/markers', markers);
app.use('/api/favorites', favorites);
app.use('/api/flights', Flights);
app.use('/api/search', Search);

// const checkAuthenticated = (req, res, next) => {
//   //this function checks if the user is logged in
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// };
// const notAuthenticated = (req, res, next) => {
//   //this function checks if the user is not logged in
//   //not working
//   //if the user is logged in
//   if (req.isAuthenticated()) {
//     //redirect to the home page
//     return res.redirect('/');
//   }
//   //if they are not authenticated keep going
//   next();
// };

// app.post('/login', (req, res, next) => {
//   const {email, password} = req.body;
//   console.log('login req.body', req.body);
//   return User.findOne({where: {email: req.body.email}}).then((data) => {
//     if (data) {
//       console.log('this is login server data', data);
//       if (password === data.password) {
//         console.log('LOGIN CORRECT');
//         res.redirect('/');
//       } else {
//         console.log('INCORRECT PASSWORD');
//         res.redirect('/');
//       }
//     } else {
//       console.log('DOES NOT WORK');
//       res.status(401).send('USER NOT FOUND');
//     }
//   });
// });

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
  ((req, res) => console.info('DISPLAYNAME 102', req.user.displayName)));

app.get('/auth/error', (req, res) => res.send('Unknown Error'));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/error' }), (req, res) => {
    res.cookie('NOLABOUND', req.user.displayName).redirect('/');
    console.log(res.cookie);
  }
);

app.get('/isLoggedin', (req, res) => req.cookies.NOLABOUND ? res.json(true) : res.json(false));

app.get('/', (req, res) => {
  console.log('DISPLAYNAME 116', req.user.displayName);
  res.send(`Welcome ${req.user.displayName}!`);
});

//logout route
app.delete('/logout', (req, res) => {
  // req.session = null;
  // req.logout();
  res.clearCookie('NOLABOUND').json(false);
});


//Documenu.configure('e8b92ac752273c041946038b6e3223f7');

const params = {'lat': '30.0086171', 'lon': '-90.1775958', 'distance': 10};

app.get('/restaurant', async (req, res) => {

  const result = await Documenu.Restaurants.getByState('LA');

  res.json(result.data.map((name) => [name]));
});

//Flights
//1970
const time = new Date(+0);
//adding seconds to 1970
time.setSeconds(time.getSeconds() + 1613429220);
//logging the updated time
console.info(String(time));

app.get('/flights', (req, res) => {
  axios.get('http://flightxml.flightaware.com/json/FlightXML2/Scheduled?airport=KMSY&howMany=4&offset=0', {
    headers: {
      'Authorization': 'Basic ZWVsbGluNjoyNmQ3YWM4NzhlY2E4ZDc0OWEzOWZmYzkzNTg0MzMyNTc3NmY1MWI5'
    },
    data: ''
  }).then(function ({ data }) {
    res.json(data.ScheduledResult.scheduled);
  }).catch(function (error) {
    res.json(error);
  });
});


app.listen(3000, () => console.log('Server is on http://localhost:3000'));
