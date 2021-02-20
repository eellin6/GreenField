const router = require('express').Router();

const { Photos } = require('../db/database');
const cloudinary = require('cloudinary');
const { getIdByUsername } = require('../helpers/user');

router.route('/').get((req, res) => {

  Photos.findAll({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) =>{
      console.log(err);
    });
});


router.route('/').post((req, res) => {
  const values = Object.values(req.files);
  console.info(values[0].path);
  const promises = values.map(image => cloudinary.uploader.upload(image.path));

  const { latitude, longitude, description, id, rating} = req.body;
  console.log('BODYYYYY SYSTEM', req.body);
  // const id = getIdByUsername(username);

  Promise
    .all(promises)
    .then(res => {
      console.log(res);
      const newPhoto = new Photos({
        imageUrl: res[0].url,
        // eslint-disable-next-line camelcase
      });
      newPhoto.save()
        .then((data) => console.log('Photo ADDED'))
        .catch((err) => console.log('this is the err we are looking for', err));
    })
    .catch(err => console.error('Error creating photo', err));
});


module.exports = router;