/* eslint-disable camelcase */
const passport = require('passport');
const cloudinary = require('cloudinary');
const flash = require('express-flash');
const session = require('express-session');
// const cors = require('cors');
const formData = require('express-form-data');
const { GoogleStrategy } = require('../passport.config.js');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
// const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const Documenu = require('documenu');
// const { Flights } = require('./api/flights');
const { Search } = require('./api/search');
const { addUser } = require('./helpers/user');


require('dotenv').config();
require('../passport.config');
app.set('view engine', 'ejs');
//changed extended to false to work with form data;allows data to be in req body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use(bodyParser.json());
// app.use(cookieSession({ name: 'google-auth-session', keys: ['key1', 'key2']}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
// app.use(cors());
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
const markers = require('./routes/markers');
const photos = require('./routes/photos');
const user = require('./routes/user');
const friends = require('./routes/friends');
// const flights = require('./routes/flights');

app.use('/comments', comments);
app.use('/users', user);
app.use('/friends', friends);
// app.use('/flights', flights);
app.use('/markers', markers);
app.use('/photos', photos);
// app.use('/api/flights', Flights);
app.use('/api/search', Search);



app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
  ((req, res) => console.info('DISPLAYNAME 102', req.user.displayName)));

app.get('/auth/error', (req, res) => res.send('Unknown Error'));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/error' }), (req, res) => {
    const { displayName } = req.user;
    res.cookie('NOLABOUND', displayName);
    return addUser(displayName)
      .then(() => res.redirect('/'))
      .catch((err) => console.warn(err));
  }
);

app.get('/isLoggedin', (req, res) => {
  req.cookies.NOLABOUND ? res.send(true) : res.send(false);
});

//logout route
app.delete('/logout', (req, res) => {
  res.clearCookie('NOLABOUND');
  res.json(false);
});

//Documenu.configure('e8b92ac752273c041946038b6e3223f7');

const params = {'lat': '30.0086171', 'lon': '-90.1775958', 'distance': 10};

app.get('/restaurant', async (req, res) => {

  const result = await Documenu.Restaurants.getByState('LA');

  res.json(result.data.map((name) => [name]));
});

//Flights


// app.get('/flights', (req, res) => {

//   axios.get('http://api.aviationstack.com/v1/flights?access_key=9fc225919793eaac770cb4bde93384e5&dep_iata=MSY').then(function (response) {
//     res.json(response.data.data);
//   }).catch(function (error) {
//     res.json(error);
//   });
// });

app.listen(8080, () => console.log('Server is on http://localhost:8080'));
