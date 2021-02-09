const router = require('express').Router();

const { Favorites } = require('../db/database');

router.route('/').post((req, res) => {
  const { latitude, longitude, description, imageUrl } = req.body;

  const newFavorite = new Favorites({
    latitude,
    longitude,
    imageUrl,
    description
  });
  newFavorite.save()
    .then((data) => {
      console.log('THIS IS DATA:', data);
      res.redirect('/');

    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;