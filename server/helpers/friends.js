/* eslint-disable camelcase */
const { Friends, Users } = require('../db/database');
const { getIdByUsername } = require('../helpers/user');

const followFriend = (user, friend) => {
  console.info('friendshelpers 6 -------------------', 'user', user, 'friend', friend);
  const userId = getIdByUsername(user);
  const friendId = getIdByUsername(friend);
  return Friends.findOrCreate({
    id_user: userId,
    id_friend: friendId,
    where: { id_user: userId }
  });
};

const checkFriendStatus = (user, friend) => {
  console.info('friendshelpers 18 -------------------', 'user', user, 'friend', friend);
  const userId = getIdByUsername(user);
  const friendId = getIdByUsername(friend);
  console.info('friendshelpers 21 -------------------', 'userID', userId, 'friendID', friendId);
  return Friends.findOne({
    where: {
      id_user: userId,
      id_friend: friendId
    }
  })
    .then((data) => console.info('CHECK', data))
    .catch((err) => console.warn(err));
};

const unfollowFriend = (user, friend) => {
  const userId = getIdByUsername(user);
  const friendId = getIdByUsername(friend);
  return Friends.destroy({
    where: {
      id_user: userId,
      id_friend: friendId
    }
  });
};

module.exports = {
  followFriend,
  checkFriendStatus,
  unfollowFriend
};