var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Factory = require("./module.factory.js");
var router = express.Router();
var bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27025/restapi');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');

var factory = new Factory(Schema,mongoose);
factory.createSchemas();

db.on('error', function callback () {
  console.log("Connection error");
});

db.once('open', function callback () {
  console.log("Mongo working!");
});

app.get('/', function (req, res) {
    res.render('index',{ title : 'Home' })
});
app.get('/readlog/:type/:val', function(req, res) {
    var searchType = req.params.type;
    switch(searchType){
        case 'ID':
            factory.getLogData({user_id: parseInt(req.params.val)},res);
        case 'log':
            factory.getLogData({log_data: req.params.val},res);
        default:
            factory.getLogData({},res);
    }
});
app.get('/readlog', function(req, res) {
               factory.getLogData({},res);
});
app.use('/', routes);
app.use('/users', users);
app.listen(2700);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/insertlog',function(req,res){
    factory.insertLogData({user_id: req.body.user_id, log_data: req.body.log_data});
    res.send("post data");
});

app.post('/updatelog',function(req,res){
    factory.updateLogData(req,res);
    res.send("data updated");
});

app.post('/deletelog',function(req,res){
    factory.deleteData(req, res);
    res.send("data deleted");
});
console.log('Listening on port 2700...');
