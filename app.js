/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

var express = require('express');
var cfenv = require('cfenv');
var mysql = require('mysql');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var web = require('web3');
// create a new express server
var app = express();

var connection = mysql.createConnection({
  host     : '52.15.75.193',
  user     : 'remote',
  password : 'remote',
  database : 'foo'
});

connection.connect();

app.get('/addUser', function(req, res)=>{
    var sql = 'INSERT INTO USERS(Email, Passw) VALUE(?, SHA(?))',param1, param2 ;
    connection.query(sql, function(err, result){
        res.send('Anadir usuario');
    });
}
app.get('/addAdmin'){
    var sql = '';
    connection.query(sql, function(err, result){
        res.send('Anadir usuario');
    });
}


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
app.get('/', function (req, res) {
    res.send('Hola Mundo');
}); //Home

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});





/**
 * Module dependencies.
 */
/*
var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    web = require('web3'),
    mysql = require('mysql')

var app = express();

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/style', express.static(path.join(__dirname, '/views/style')));

var connection = mysql.createConnection({
  host     : 'ubuntu@ec2-52-15-75-193.us-east-2.compute.amazonaws.com',
  user     : 'remote',
  password : 'remote'
});

connection.connect(function(err){
    if (err) throw err
      console.log('You are now connected...');
});

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
}


var web3 = new web(web.givenProvider || "ws://localhost:8545");
console.log(web3);

//Rutas
app.get('/', routes.index); //Home

app.get('/login', function (req, res) {
  res.render('login.html', { title: 'Hey'})
})
//Cambios Paulo
app.use('/admin', function(req, res){
    res.render('login.html', { title: 'Hey'})
});
//Cambios



http.createServer(app).listen(app.get('port'), '0.0.0.0', function() {
    console.log('Express server listening on port ' + app.get('port'));
});
*/
