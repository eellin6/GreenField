/* eslint-disable camelcase */
const { Router } = require('express');
const Friend = Router();

const { Friends, Users } = require('../db/database');
const { getIdByUsername } = require('../helpers/user');

const followFriend = async(user, friend) => {
  const userId = getIdByUsername(user);
  const friendId = getIdByUsername(friend);
  const newFriend = await Friends.findOrCreate({
    id_user: userId,
    is_friend: friendId,
    where: { id_user: userId }
  });
  return newFriend;
};

const unfollowFriend = (body) => {
  const { id } = body;
  return Users.destroy({ where: { id } });
};

Friend.get('/', (req, res) => {
  return Friends.findAll({})
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

// get friend info from frontend
Friend.get('/follow', (req, res) => {
  return followFriend(req.cookies.NOLABOUND, friend)
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

module.exports = Friend;