var express = require('express');
var router = express.Router();
var User = require('../models/user'); // ../ to move up one directory
var passport = require('passport');


/* GET home page. */
router.get('/', function (req, res, next) {
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
  res.render('login', { title: 'Login' })
});

/* POST login page. */
router.post('/login', passport.authenticate(
  "local", {
    successRedirect: "/latest",
    failureRedirect: "/login",
    failureMessage: "Invalid username or password.",
}))

/* GET signup page. */
router.get('/signup', (req, res, next) => {
  res.render('signup', { title: 'Sign Up' })
});

/* POST signup page. */
router.post('/signup', (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function (error, newUser) {
      if (error) {
        console.error('Error registering user:', error);
        return res.redirect("/signup");
      } else {
        req.login(newUser, (err) => {
          if (err) {
            return res.redirect("/signup");
          }
          return res.redirect("/latest");
        });
      }
    }
  );
});

/* POST contact page. */



module.exports = router;
