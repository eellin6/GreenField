// const router = require('express').Router();

// const { Flights } = require('../db/database');

// router.route('/').get((req, res) => {
//   const { latitude, longitude, description, imageUrl } = req.body;

//   const newFlights = new Flights({
//     latitude,
//     longitude,
//     imageUrl,
//     description
//   });
//   newFlights.save()
//     .then((data) => {
//       console.info('THIS IS DATA:', data);
//       res.redirect('/');

//     })
//     .catch((err) => {
//       console.warn(err);
//     });
// });

// module.exports = router;