const { Users } = require('../db/database');

const addUser = (username) => {
  const newUser = new Users({
    username: username,
  });
  newUser.save()
    .then((data) => {
      console.log('THIS IS USER DATA:', data);
      res.redirect('/');
    }).catch((err) => console.log(err));
};

module.exports = {
  addUser
};