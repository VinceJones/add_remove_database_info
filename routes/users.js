var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var Assignment = require('../models/assignment');

// READ: GET data from database
router.get('/', function(req, res, next) {
    Assignment.find(function(err, data){
      if (err) return next("Hey bozo, you gots READ error ", err);
      res.json(data);
  });
});

// CREATE: Post data to the Database
router.post('/', function(req, res, next){
    Assignment.create(req.body, function(err, postBackData){
      if (err) return next("Hey bozo, you gots CREATE error ", err);
        res.sendFile(path.resolve(__dirname, '../views/index.html'));
    });
});

// UPDATE:
router.put('/:id', function(req, res, next){
    Assignment.findByIdAndUpdate(req.params.id, req.body, function(err, post){
      if (err) return next("Hey bozo, you gots UPDATE error ", err);
      res.json(post);
    });
});

// DELETE:
router.delete('/:id', function(req, res, next){
    Assignment.findByIdAndRemove(req.params.id, req.body, function(err, postBackData){
      if (err) return next("Hey bozo, you gots DELETE error ", err);
      res.json(postBackData);
    });
});

console.log("Hey Bud, users.js Loads, ya hoosier");

module.exports = router;
