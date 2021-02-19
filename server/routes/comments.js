/* eslint-disable camelcase */
const router = require('express').Router();

const { Comments } = require('../db/database');




router.route('/').get((req, res) => {

  return Comments.findAll({})
    .then((data) => { res.send(data); })
    .catch((err) => {
      console.log(err);
    });

});

router.route('/').post((req, res) => {

  const { comments, idUser, idMarker } = req.body;

  const newComment = new Comments({
    comments,
    id_user: idUser,
    id_marker: idMarker
  });

  newComment.save()
    .then((data) => {
      console.log('COMMENTS ADDED');
      res.redirect('/');

    }).catch((err) => console.log(err));
});

module.exports = router;