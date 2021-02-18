const { Router } = require('express');
const User = Router();

const { Users } = require('../db/database');
const { addUser, deleteUser } = require('../helpers/user');

// User.post('/', (req, res) => {
//   console.log (req.cookies.NOLABOUND);
//   return addUser(req.cookies.NOLABOUND)
//     .then((data) => res.send(data))
//     .catch((err) => console.warn(err));
// });

User.get('/', (req, res) => {
  return Users.findAll({})
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

User.delete('/:id', (req, res) => {
  return deleteUser(req.params)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

module.exports = User;