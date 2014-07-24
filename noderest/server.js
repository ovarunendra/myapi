/**
 * Created by ovarunendra on 7/24/14.
 */
var express = require('express'),
mongoose = require('mongoose');
require('./models/musician');
var app = express();
app.use(express.static(__dirname + '/public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
require('./routes')(app);

var mongoUri = 'mongodb://localhost:27025/noderest';
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + mongoUri);
});
app.get('/', function (req, res) {
    res.render('index',{ title : 'Home' })
});
app.listen(5001);
console.log('Listening on port 5001...');