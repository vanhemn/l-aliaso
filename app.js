/*=====================Initialisation=====================*/
const express = require("express");
const app = express();
const http = require('http').Server(app);
const httpd = require('https');
const fs = require('fs');
const bodyParser = require('body-parser')
const ejs = require('ejs');
const path = require('path');
/*=====================Database=====================*/
const session = require('express-session');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/aliaso');
let db = mongoose.connection;
db.on('error', function(err){
  process.exit(1)
});
db.once('open', function() {
  console.log('Connected')
});

//define model
require('./model/model.js')(mongoose);

/*======================Settings App====================*/
// Middleware session
app.engine('html', require('ejs').renderFile);

app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: "clang",
}));

app.use(bodyParser.json());       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
})); 

/*======================Route fichier static (public)====================*/
app.use("/css", express.static(__dirname + '/public/css'));
app.use("/img", express.static(__dirname + '/public/img'));
app.use("/js", express.static(__dirname + '/public/js'));

/*======================Routes==========================*/ 
require('./src/index.js')(app, path, ejs, fs);



/*==================Start serv==================*/
http.listen(80, function(){
	console.log('listening on *:' + 80);
});