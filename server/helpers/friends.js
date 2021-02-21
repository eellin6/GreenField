/* eslint-disable camelcase */
const { Friends, Users } = require('../db/database');
const { getIdByUsername } = require('../helpers/user');

const followFriend = async (user, friendId) => {
  const userId = await getIdByUsername(user);
  return Friends.findOrCreate({
    id_user: userId,
    id_friend: friendId,
    where: { id_user: userId, id_friend: friendId }
  })
    // .then((data) => console.log('followCHECK', data))
    .then((data) => data)
    .catch((err) => console.warn(err));
};

const checkFriendStatus = async (user, friend) => {
  // console.info(friend);
  const userId = await getIdByUsername(user);
  return Friends.findOne({
    where: {
      id_user: userId,
      id_friend: friend
    }
  })
    .then((data) => data ? true : false)
    .catch((err) => console.warn(err));
};

const unfollowFriend = async (user, friend) => {
  const userId = await getIdByUsername(user);
  console.info('friendshelpers 32 --------------', 'userID', userId, 'friendID', friend);
  return Friends.destroy({
    where: {
      id_user: userId,
      id_friend: friend
    }
  })
    .then((data) => console.info('unfollowCHECK', data))
    .catch((err) => console.warn(err));
};

// const removeFriend = (body) => {
//   const { id } = body;
//   return Friends.destroy({ where: { id } })
//     .then((data) => console.info(data))
//     .catch((err) => console.warn(err));
// };

module.exports = {
  followFriend,
  checkFriendStatus,
  unfollowFriend
};