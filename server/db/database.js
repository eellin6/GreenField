const { Sequelize } = require('sequelize');
const db = new Sequelize('Maps', 'root', '');

const User = db.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

const Markers = db.define('Markers', {
  latitude: Sequelize.INTEGER,
  longitude: Sequelize.INTEGER,
  imageUrl: Sequelize.STRING,

});
const Favorites = db.define('Markers', {
  latitude: Sequelize.INTEGER,
  longitude: Sequelize.INTEGER,
  imageUrl: Sequelize.STRING,

});