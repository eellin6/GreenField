const  Sequelize  = require('sequelize');
const mysql = require('mysql2');
const db = new Sequelize('maps', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
})
db.authenticate()
.then(() => {
console.log('connected to the database')
})
.catch((err) => {
  console.log('could not connect to database', err)
})
module.exports = db;