/* eslint-disable camelcase */
const passport = require('passport');
const cloudinary = require('cloudinary');
const flash = require('express-flash');
const session = require('express-session');
const cors = require('cors');
const formData = require('express-form-data');
const { GoogleStrategy } = require('../passport.config.js');
const express = require('express');
const { User, Favorites, Markers, Comments } = require('./db/database.js');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const axios = require('axios');
const Documenu = require('documenu');
const { Flights } = require('./api/flights');

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
app.use(cors());
app.use(flash());
app.use(formData.parse());
app.use(session({
  secret: process.env.clientSecret,
  resave: false, //should we resave if nothing changes
  saveUninitialized: false // do we want to save empty value
}));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const comments = require('./routes/comments');
const favorites = require('./routes/favorites');
const markers = require('./routes/markers');
const photos = require('./routes/photos');
const search = require('./routes/search');
const user = require('./routes/user');
// const flights = require('./routes/flights');

app.use('/comments', comments);
app.use('/register', user);
app.use('/markers', markers);
app.use('/api/favorites', favorites);
app.use('/api/flights', Flights);


const checkAuthenticated = (req, res, next) => {
  //this function checks if the user is logged in
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};
const notAuthenticated = (req, res, next) => {
  //this function checks if the user is not logged in
  //not working
  //if the user is logged in
  if (req.isAuthenticated()) {
    //redirect to the home page
    return res.redirect('/');
  }
  //if they are not authenticated keep going
  next();
};

app.post('/login', (req, res, next) => {


  const {email, password} = req.body;
  console.log('login req.body', req.body);
  return User.findOne({where: {email: req.body.email}}).then((data) => {

    if (data) {
      console.log('this is login server data', data);

      if (password === data.password) {
        console.log('LOGIN CORRECT');
        res.redirect('/');
      } else {
        console.log('INCORRECT PASSWORD');
        res.redirect('/');
      }

    } else {
      console.log('DOES NOT WORK');
      res.status(401).send('USER NOT FOUND');
    }
  });
});

//logout route
app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
app.get('/auth/error', (req, res) => res.send('Unknown Error'));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/auth/error' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/', (req, res) => res.send(`Welcome ${req.user.displayName}!`));

Documenu.configure('cbc4ba8f37ca50c83b77150de8f14c43');

const params = {'lat': '30.0086171', 'lon': '-90.1775958', 'distance': 10};

app.get('/restaurant', async (req, res) => {
  // const result = await Documenu.MenuItems.searchGeo(params);
  const result = await Documenu.Restaurants.getByState('LA');
  const obj = {};
  const result1 = [];

  // result.data.map((name) => {
  //   if (obj[name.restaurant_name]) {

  //   } else {
  //     obj[name.restaurant_name] = true;
  //     result1.push(name);
  //   }

  // });
  res.json(result.data.map((name) => name.restaurant_name));


});




//Flights


app.get('/flights', (req, res) => {

  axios.get('http://api.aviationstack.com/v1/flights?access_key=9fc225919793eaac770cb4bde93384e5&dep_iata=MSY').then(function (response) {
    res.json(response.data.data);
  }).catch(function (error) {
    res.json(error);
  });
});

app.listen(3000, () => console.log('Server is on http://localhost:3000'));
