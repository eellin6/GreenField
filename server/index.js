const express = require('express');
const db = require('./db/database.js')
const app = express();
const path = require('path');
const axios   = require('axios');
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '..','client','dist')))
app.set('view-engine', 'ejs')

app.get('/', (req, res) => {
  //render homepage?
  res.render('index.html')

})

app.get('/login', (req, res) => {
  res.render('login.ejs')
})
app.get('/register', (req, res) => {
  res.render('register.ejs')
})
app.post('register', (req, res) => {

})



app.listen(3000, function() {
  console.log('listening on 3000')
})