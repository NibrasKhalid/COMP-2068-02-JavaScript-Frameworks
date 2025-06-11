var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET about page. */
router.get('/about', (req, res, next) => {
  res.render('about', { title: 'About Me' });
});

/* GET projects page. */
router.get('/projects', (req, res, next) => {
  res.render('projects', { title: 'Projects' })
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('contact', { title: 'Contact Me' })
});


module.exports = router;
