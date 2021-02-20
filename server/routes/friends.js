const { Router } = require('express');
const Friend = Router();

const { followFriend, unfollowFriend } = require('../helpers/friends');

Friend.get('/', (req, res) => {
  return Friends.findAll({})
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

// get friend info from frontend
Friend.post('/follow', (req, res) => {
  const user = req.cookies.NOLABOUND;
  const friend = req.params;
  return followFriend(user, friend)
    .then((data) => res.send(data))
    .catch((err) => console.warn(err));
});

// Friend.put('/:id', (req, res) => {
//   return unfollowFriend(req.params)
//     .then((data) => res.json(data))
//     .catch((err) => console.warn(err));
// });

Friend.delete('/:id', (req, res) => {
  const user = req.cookies.NOLABOUND;
  const friend = req.params;
  return unfollowFriend(user, friend)
    .then((data) => res.json(data))
    .catch((err) => console.warn(err));
});

module.exports = Friend;