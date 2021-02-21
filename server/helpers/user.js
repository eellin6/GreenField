const { Users } = require('../db/database');

const addUser = (username) => {
  return Users.findOrCreate({
    username, where: { username }
  });
  // return newUser;
};

const deleteUser = (body) => {
  const { id } = body;
  return Users.destroy({ where: { id } });
};

const getIdByUsername = (username) => {
  return Users.findOne({ where: { username } })
    .then(({ id }) => id)
    .catch((err) => console.warn(err));
};

module.exports = {
  addUser,
  deleteUser,
  getIdByUsername
};