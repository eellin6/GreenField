const { Router } = require('express');
const Flights = Router();
const { getNolaFlights } = require('../helpers/flights');

// Flights.get('/', (req, res) => {
//   getNolaFlights()
//     .then((data) => res.status(200).json(data))
//     .catch(() => res.warn(404));
// });

// Flights.post('/save', (req, res) => {
//   console.info(req.body.url);
//   const newFlight = new Flights({
//     url: req.body.url
//   });
//   Picture.findOne({ url: req.body.url })
//     .then(data => {
//       if (data) {
//         res.json('Already Exists');
//       } else {
//         newPic.save()
//           .then(() => res.json('Saved!'))
//           .catch((err) => console.log(err));
//       }
//     })
//     .catch((err) => console.log(err));
// });

module.exports = {
  Flights,
};