if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
  //this loads all the environment variables and sets them inside of process.env
}
const methodOverride = require('method-override')
const express = require('express');
const db = require('./db/database.js')
const app = express();
const path = require('path');
const axios = require('axios');
const bodyParser= require('body-parser');
//changed extended to false to work with form data;allows data to be in req body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '..','client','dist')))

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
   email => db.find(user => user.email === email)
  //return db query  find user => user.email === email
  //id => users.find(user => user.id === id)
);
app.get('/',checkAuthenticated, (req, res) => {
  //render homepage
  res.render('index.html')

})
//login route to display login page
app.get('/login', notAuthenticated, (req, res) => {
  res.render('Login.jsx')
})
//registration route
app.get('/register', (req, res) => {
  res.render('Register.jsx')
})
//signup route to submit registration
app.post('/register', notAuthenticated, async (req, res) => {
//create new user with hashed password
try {
const hashedPw = await bcrypt.hash(req.body.password, 10)
//insert id name email and hasedPW into db
//res.redirect('/login)
} catch {
res.redirect('/register')
}
})
//login route to submit a login
app.post('/login', notAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}) )
//logout route
app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

app.listen(3000, function() {
  console.log('listening on 3000')
})