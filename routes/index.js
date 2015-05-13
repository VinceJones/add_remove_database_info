var express = require('express');
var router = express.Router();
var path = require('path');

// CREATE: Post data to the Database
//router.post('/', function(req, res, next){
//  Assignment.create(req.body, function(err, postBackData){
//    if (err) return next("Hey bozo, you gots CREATE error ", err);
//    console.log("Sending back index.html");
//    res.sendFile(path.resolve(__dirname, '../views/index.html'));
//  });
//});

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
