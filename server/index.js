const express = require('express');
const db = require('./db/database.js')
const {User, Favorites, Markers} = require('./db/database.js')
const app = express();

const path = require('path');
const axios   = require('axios');
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '..','client','dist')))
app.listen(3000, function() {
  console.log('listening on 3000')
})
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