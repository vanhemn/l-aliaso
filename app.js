const express = require("express");
const app = express();
const http = require('http').Server(app);
const httpd = require('https');
const fs = require('fs');
const bodyParser = require('body-parser')
const ejs = require('ejs');
const path = require('path');
const session = require('express-session');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'seat', 'da8c96d1f2928e3c117d37b3beaedf47a430e0f2', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
//define model
require('./model/verbe.js')(sequelize);
require('./model/mots.js')(sequelize);
sequelize.sync().then(() => {
  console.log("DB created")
}).catch(error => {
  console.log(error)
})