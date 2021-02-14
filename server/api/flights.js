const { Router } = require('express');
const Flights = Router();
const { getNolaFlights } = require('../helpers/flights');

Flights.get('/', (req, res) => {
  getNolaFlights()
    .then((data) => res.status(200).json(data))
    .catch(() => res.warn(404));
});

module.exports = {
  Flights,
};