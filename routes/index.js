var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

/* GET database display template */
router.get('/template', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, '../views/userTemplate.html'));
});

/* GET post to database template */
router.get('/postTemplate', function(req, res, next){
  res.sendFile(path.resolve(__dirname, '../views/create.html'));
});

module.exports = router;
