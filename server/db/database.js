/* eslint-disable camelcase */
const Sequelize = require('sequelize');
const mysql = require('mysql2');

// const db = new Sequelize('newMaps', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql'
//   // logging: false
// });

const db = new Sequelize('bpqhvmuoeogfmdagveod', 'urwckhywrljgmor7', 'xOmX9ozGoAr54BAFXWs3', {
  host: 'bpqhvmuoeogfmdagveod-mysql.services.clever-cloud.com',
  dialect: 'mysql',
});

//const db = new Sequelize('mysql://localhost:8080/maps')
db.authenticate()
  .then(() => {
    console.log('CONNECTED to the database');
  })
  .catch((err) => {
    console.log('could not connect to database', err);
  });

const Users = db.define('Users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  username: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Friends = db.define('Friends', {
  id_user: Sequelize.INTEGER,
  id_friend: Sequelize.INTEGER
});

const Markers = db.define('Markers', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  latitude: Sequelize.DECIMAL(10, 4),
  longitude: Sequelize.DECIMAL(10, 4),
  imageUrl: {
    type: Sequelize.STRING(1000),
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    unique: true
  },
  isFavorite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  id_user: Sequelize.INTEGER
});

const Comments = db.define('Comments', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  comments: Sequelize.STRING,
  is_user: Sequelize.INTEGER,
  id_marker: Sequelize.INTEGER
});

const Flights = db.define('Flights', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  destination: Sequelize.STRING,
  landingTime: Sequelize.STRING,
  flightNumber: Sequelize.STRING,
  isSaved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  id_user: Sequelize.INTEGER
});



db.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
  }).catch((err) => { console.log(err); });


module.exports = {
  db,
  Users,
  Markers,
  Flights,
  Comments,
  Friends
};