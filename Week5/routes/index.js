var express = require('express');
var router = express.Router();

var Project = require('../models/project.js');
// Import the Project model

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
