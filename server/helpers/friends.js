/* eslint-disable camelcase */
const { Friends, Users } = require('../db/database');
const { getIdByUsername } = require('../helpers/user');

const followFriend = async(user, friend) => {
  const userId = getIdByUsername(user);
  const friendId = getIdByUsername(friend);
  const newFriend = await Friends.findOrCreate({
    id_user: userId,
    id_friend: friendId,
    where: { id_user: userId }
  });
  return newFriend;
};

const unfollowFriend = (user, friend) => {
  // const { id } = friend;
  const userId = getIdByUsername(user);
  const friendId = getIdByUsername(friend);
  return Users.destroy({
    where: {
      id_user: userId,
      id_friend: friendId
    }
  });
};

module.exports = {
  followFriend,
  unfollowFriend
};