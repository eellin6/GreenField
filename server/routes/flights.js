/* eslint-disable camelcase */
const router = require('express').Router();

const { Flights } = require('../db/database');




router.route('/').get((req, res) => {

  return Flights.findAll({})
    .then((data) => { res.send(data); })
    .catch((err) => {
      console.log(err);
    });

});

router.route('/save').post((req, res) => {

  // const { comments, description, idUser, idMarker } = req.body;
  console.log('THIS RT HERE YALL', req.body);
  const { destinationCity, landingTime, takeoffTime, flightNumber } = req.body;

  const newFlights = new Flights({
    destinationCity: destinationCity,
    landingTime: landingTime,
    takeoffTime: takeoffTime,
    flightNumber: flightNumber
  });

  newFlights.save()
    .then((data) => {
      console.log('Flight ADDED');
      res.redirect('/');

    }).catch((err) => console.log(err));
});

module.exports = router;