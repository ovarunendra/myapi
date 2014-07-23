var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.route('/:name').post(function(req, res) {
    console.log(req.params.name);
    res.send(req.params.name);
});
module.exports = router;
