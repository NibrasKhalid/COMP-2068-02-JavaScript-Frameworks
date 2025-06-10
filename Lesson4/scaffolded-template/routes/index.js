var express = require('express');
var router = express.Router();

/* GET home page. */
/* Get // > landing page for this section */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// More granular routes can me added here
//These are relative to the path defined in app.js
router.get("/about", function(req, res, next) {
  var toolsList = [
    {name: "C#"},
    {name: "JavaScript"},
    {name: "Express"},
    {name: "Node.js"},
    {name: "Angular"}
  ]
  res.render('about', { title: 'About Us', tools: toolsList });
});

module.exports = router;
