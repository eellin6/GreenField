const { Router } = require('express');
const Friend = Router();

const { followFriend, checkFriendStatus, unfollowFriend } = require('../helpers/friends');

// get all friends
Friend.get('/', (req, res) => {
  return Friends.findAll({})
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

// find one
Friend.get('/status', (req, res) => {
  const user = req.cookies.NOLABOUND;
  const { friend } = req.query;
  return checkFriendStatus(user, friend)
    .then((data) => {
      console.info('BOOL', data);
      return data ? res.json(true) : res.json(false);
    })
    .catch((err) => console.warn(err));
});

Friend.post('/', (req, res) => {
  const user = req.cookies.NOLABOUND;
  const { friend } = req.query;
  return followFriend(user, friend)
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

Friend.delete('/', (req, res) => {
  const user = req.cookies.NOLABOUND;
  const { friend } = req.query;
  return unfollowFriend(user, friend)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

module.exports = Friend;