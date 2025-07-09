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

/* GET movies page */
router.get('/movies', (req, res, next) => {
  const movies = [/* movie objects */]; // Replace with TMDB or mock data
  res.render('search', { title: 'Movies', items: movies, user: req.user });
});

/* GET series page */
router.get('/series', (req, res, next) => {
  const series = [/* series objects */];
  res.render('search', { title: 'TV Series', items: series, user: req.user });
});

/* GET favorites page */
router.get('/favorites', (req, res, next) => {
  const favorites = [/* user's favorite items */];
  res.render('search', { title: 'Favorites', items: favorites, isFavoritesPage: true, user: req.user });
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
