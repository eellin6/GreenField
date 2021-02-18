const { Users } = require('../db/database');

const addUser = async(username) => {
  const newUser = await Users.findOrCreate({
    username, where: { username }
  });
  return newUser;
};

const deleteUser = (body) => {
  const { id } = body;
  return Users.destroy({ where: { id } });
};

module.exports = {
  addUser,
  deleteUser
};