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

// router.route('/find').get((req, res) => {
//   const { id } = req.body;
//   Markers.findOne({ where: { id } })
//     .then((data) => res.send(data))
//     .catch((err) => console.warn(err));
// });

router.route('/create').post((req, res) => {

  const values = Object.values(req.files);
  // console.info(values[0].image);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));

  const { latitude, longitude, description, id, rating} = req.body;
  console.log('BODYYYYY SYSTEM', req.body);
  console.log('BODYYYYY SYSTEM: id', id);
  // const id = getIdByUsername(username);

  Promise
    .all(promises)
    .then(res => {

      const newMarker = new Markers({
        latitude,
        imageUrl: res[0].url,
        longitude,
        description,
        rating: rating,
        // eslint-disable-next-line camelcase
        id_user: id
      });
      //console.log('markerrr line 47', rating);
      newMarker.save()
        .then((data) => console.log('MARKERS ADDED'))
        .catch((err) => console.log('this is the err we are looking for', err));
    })
    .catch(err => console.error('Error creating marker', err));
});

router.route('/:id').delete((req, res) => {
  const { id } = req.params;
  return Markers.destroy({ where: { id: id }})
    .then((data) => res.status(200).json(data))
    .catch((err) => console.log(err));
});


module.exports = router;