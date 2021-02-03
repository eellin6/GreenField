if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
  //this loads all the environment variables and sets them inside of process.env
}

const methodOverride = require('method-override')
const express = require('express');
const db = require('./db/database.js')
const {User, Favorites, Markers} = require('./db/database.js')
const app = express();

const path = require('path');
const axios = require('axios');
const bodyParser= require('body-parser');
//changed extended to false to work with form data;allows data to be in req body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..','client','dist')))
app.use(bodyParser.json())
const bcrypt =  require('bcrypt')
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('../passport.config')
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,//should we resave if nothing changes
  saveUninitialized: false // do we want to save empty value
}))
app.use(methodOverride('_method'))
// app.set('view engine', 'ejs')
app.use(passport.initialize())
//stores variables to be persisted across the session
app.use(passport.session())
const checkAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login')
}
const notAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()){
   return res.redirect('/');
  }
  next();
}
initializePassport(passport,
   email => User.findOne({where: {}})
  //return db query  find user => user.email === email
  //id => users.find(user => user.id === id)
);

//login route to display login page
app.get('/login',  (req, res) => {
  res.render('/login')
})
//registration route
app.get('/register', (req, res) => {
  res.render('Login.jsx')
})
//signup route to submit registration

app.get('/api/markers', (req, res) => {

  Markers.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) =>{
      console.log(err);
    });
});
app.post('/api/markers/', (req, res) => {
  console.log('APP POST REQ BODY', req.body);

  const {latitude,
    longitude,
    imageUrl,
    description} = req.body;

  const newMarker = new Markers({
    latitude,
    longitude,
    imageUrl,
    description
  });

  newMarker.save()
    .then((data) => {
      console.log(data);

    })
    .catch((err) => {
      console.log(err);
    });
});
app.post('/register', notAuthenticated, async(req, res) => {
  //console.log('APP POST REQ', req);
  const {username, email} = req.body;
  const password = await bcrypt.hash(req.body.password, 10)

  const newUser = new User({
    username,
    password,
    email
  })
  newUser.save()
    .then((data) => {
      //console.log('THIS IS DATA:', data);
      res.redirect('/')

    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/api/favorites', (req, res) => {
  console.log('APP POST REQ', req.body);
  const {latitude, longitude, description, imageUrl} = req.body;


  const newFavorite = new Favorites({
    latitude,
    longitude,
    imageUrl,
    description
  })
  newFavorite.save()
    .then((data) => {
      console.log('THIS IS DATA:', data);
      res.redirect('/')

    })
    .catch((err) => {
      console.log(err);
    });
});

//app.post('/login', notAuthenticated, passport.authenticate('local', {

//   successRedirect: '/',
//   failureRedirect: '/',
//   failureFlash: true
// })


// )

app.post('/login', (req, res, next) => {
  //console.log(Users);

  const {email, password} = req.body;
  console.log('login req.body', req.body)
  return User.findOne({where: {email: req.body.email}}).then((data) => {
    //console.log('THIS IS DATA', data);
    if (data) {
      console.log('this is login server data', data)

       bcrypt.compare(password, data.password)
      .then((correct) => console.log('login successful'))
      .catch((err) => console.log('WRONG PASSWORD', err))

    } else {
      console.log('DOES NOT WORK')
      res.redirect('/');

    }
  });
});





//logout route
app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})







app.listen(3000, function() {
  console.log('listening on 3000')
})
