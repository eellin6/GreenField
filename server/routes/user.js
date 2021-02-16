const router = require('express').Router();

const { User } = require('../db/database');

router.route('/').post((req, res) => {

  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    password,
    email
  });
  newUser.save()
    .then((data) => {
      console.log('THIS IS USER DATA:', data);
      res.redirect('/');
    }).catch((err) => console.log(err));
});

router.route('/').get((req, res) => {
  return User.findAll({})
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

module.exports = router;