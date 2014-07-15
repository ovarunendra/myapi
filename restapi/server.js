var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Factory = require("./module.factory.js");

mongoose.connect('mongodb://localhost:27025/restapi');
var db = mongoose.connection;

var factory = new Factory(Schema,mongoose);
factory.createSchemas();
db.on('error', function callback () {
  console.log("Connection error");
});

db.once('open', function callback () {
  console.log("Mongo working!");
});


app.get('/insertlog/:user_id/:log_data/:datetime', function(req, res) {
    factory.insertLogData({user_id: req.params.user_id,log_data:req.params.log_data,datetime:req.params.datetime});
    res.send('Addedd!');
    
});
app.get('/updatelog/:log_id/:user_id/:log_data', function(req, res) {
    factory.updateLogData(req,res);
//    res.send('Updated!');

});

app.get('/readlog/:log_data', function(req, res) {
    factory.getLogData({log_data: req.params.log_data},res);
});

app.get('/deletelog/:log_id', function(req, res) {
    factory.deleteData(req, res);
});

app.get('/', function (req, res) {
    res.render('index',{ title : 'Home' })
});


app.listen(2700);
console.log('Listening on port 2700...');
