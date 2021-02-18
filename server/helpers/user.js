const { Users } = require('../db/database');

const addUser = async(user) => {
  // Users.findOne({ where: { username: user }})
  //   ? console.info('user exists')
  //   :
  const newUser = await Users.findOrCreate({
    username: user, where: { username: user }
  });
  console.info(newUser);
  // return newUser;
  return newUser;
};

// const addUser = (user) => {
//   Users.findOne({ where: { username: user }})
//     .then((data) => {
//       if (!data) {
//         const newUser = new Users({
//           username: user,
//         });
//         newUser.save()
//           .then((data) => {
//             console.log('THIS IS USER DATA:', data);

//           }).catch((err) => console.warn('inside user err', err));
//       }
//     })
//     .catch((err) => console.warn('outside user err', err));
// };

const deleteUser = (body) => {
  const { id } = body;
  return Users.destroy({
    where: {
      id: id
    }
  });
};

module.exports = {
  addUser,
  deleteUser
};