var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('contact')
});

/* GET latest page. */
router.get('/latest', (req, res, next) => {
  res.render('latest', { title: 'Latest' })
});

/* GET login page. */
router.get('/login', (req, res, next) => {
  res.render('login')
});

/* GET signup page. */
router.get('/signup', (req, res, next) => {
  res.render('signup')
});

module.exports = router;
