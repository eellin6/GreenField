if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config
}
const methodOverride = require('method-override')
const express = require('express');
const db = require('./db/database.js')
const app = express();
const path = require('path');
const axios = require('axios');
const bodyParser= require('body-parser');
//changed extended to false to work with form data;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '..','client','dist')))
app.set('view-engine', 'ejs')
const bcrypt =  require('bcrypt')
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const initializePassport = require('../passport.config')
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(methodOverride('_method'))
app.use(passport.initialize())
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
initializePassport(passport, email => {
  //return db query  find user => user.email === email
  //id => users.find(user => user.id === id)
});
app.get('/',checkAuthenticated, (req, res) => {
  //render homepage?
  res.render('index.html')

})

app.get('/login', notAuthenticated, (req, res) => {
  res.render('login.ejs')
})
app.get('/register', (req, res) => {
  res.render('register.ejs')
})
app.post('/register',notAuthenticated, async (req, res) => {

try {
const hashedPw = await bcrypt.hash(req.body.password, 10)
//insert id name email and hasedPW into db
//res.redirect('/login)
} catch {
res.redirect('/register')
}
})

app.post('/login',notAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}) )

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

app.listen(3000, function() {
  console.log('listening on 3000')
})