const { Router } = require('express');
const User = Router();

const { Users } = require('../db/database');
const { addUser, deleteUser, getIdByUsername } = require('../helpers/user');

User.get('/', (req, res) => {
  return Users.findAll({})
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

User.get('/find', (req, res) => {
  const username = req.cookies.NOLABOUND;
  return getIdByUsername(username)
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

User.delete('/:id', (req, res) => {
  return deleteUser(req.params)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

module.exports = User;