const router = require('express').Router();

const { Markers } = require('../db/database');
const cloudinary = require('cloudinary');
const { getIdByUsername } = require('../helpers/user');

router.route('/').get((req, res) => {

  Markers.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) =>{
      console.log(err);
    });
});

router.route('/create').post((req, res) => {

  const values = Object.values(req.files);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));

  const { latitude, longitude, description, id } = req.body;
  console.log('BODYYYYY SYSTEM', req.body);
  // const id = getIdByUsername(username);

  Promise
    .all(promises)
    .then(res => {
      console.log(res);
      const newMarker = new Markers({
        latitude,
        imageUrl: res[0].url,
        longitude,
        description,
        // eslint-disable-next-line camelcase
        id_user: id
      });
      newMarker.save()
        .then((data) => console.log('MARKERS ADDED'))
        .catch((err) => console.log('this is the err we are looking for', err));
    })
    .catch(err => console.error('Error creating marker', err));
});


module.exports = router;