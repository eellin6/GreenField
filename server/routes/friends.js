const { Router } = require('express');
const Friend = Router();

const { Friends } = require('../db/database');
const { followFriend, checkFriendStatus, unfollowFriend } = require('../helpers/friends');

// get all friends
Friend.get('/', (req, res) => {
  return Friends.findAll({})
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

// check if users are friends
Friend.get('/status', (req, res) => {
  const user = req.cookies.NOLABOUND;
  const { friend } = req.query;
  return checkFriendStatus(user, friend)
    .then((data) => data ? res.json(true).status(200) : res.json(false).status(200))
    .catch((err) => console.warn(err));
});

Friend.post('/', (req, res) => {
  const user = req.cookies.NOLABOUND;
  const { friend } = req.body;
  return followFriend(user, friend)
    .then((data) => res.json(data).status(201))
    .catch((err) => console.warn(err));
});

Friend.delete('/', (req, res) => {
  const user = req.cookies.NOLABOUND;
  const { friend } = req.query;
  return unfollowFriend(user, friend)
    .then((data) => res.json(data).status(200))
    .catch((err) => console.warn(err));
});

Friend.delete('/:id', (req, res) => {
  const { id } = req.params;
  return Friends.destroy({ where: { id: id }})
    .then((data) => res.status(200).json(data))
    .catch((err) => console.log(err));
});

module.exports = Friend;