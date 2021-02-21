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

router.route('/').post((req, res) => {

  // const { comments, description, idUser, idMarker } = req.body;
  console.log(req.body);
  const { comments, description } = req.body;

  const newFlights = new Flight({
    comments,
    description,
    // id_user: idUser,
    // id_marker: idMarker
  });

  newComment.save()
    .then((data) => {
      console.log('COMMENTS ADDED');
      res.redirect('/');

    }).catch((err) => console.log(err));
});

module.exports = router;