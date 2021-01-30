const express = require('express');
const app = express();
const path = require('path');
const axios   = require('axios');
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '..','client','dist')))
app.listen(3000, function() {
  console.log('listening on 3000')
})