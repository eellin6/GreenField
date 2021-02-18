const { Router } = require('express');
const User = Router();

const { Users } = require('../db/database');
const { addUser } = require('../helpers/user');

User.post('/', (req, res) => {
  console.log (req.cookies.NOLABOUND);
  return addUser(req.cookies.NOLABOUND)
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

User.get('/', (req, res) => {
  return Users.findAll({})
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

module.exports = User;