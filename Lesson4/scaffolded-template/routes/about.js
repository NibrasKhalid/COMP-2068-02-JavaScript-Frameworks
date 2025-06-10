//This router object is used to define routes for the "about" page of the application.
// I might decide to add sub-pages such as our Teams, Frameworks, etc.

//Import express and create router object
const express = require('express');
const router = express.Router();
//Configure routes relative to /about
router.get('/', function(req, res, next) {
   var toolsList = [
    {name: "C#"},
    {name: "JavaScript"},
    {name: "Express"},
    {name: "Node.js"},
    {name: "Angular"}
  ];
  res.render('about', { title: 'About Us', tools: toolsList });
});
//export router objects
module.exports = router;