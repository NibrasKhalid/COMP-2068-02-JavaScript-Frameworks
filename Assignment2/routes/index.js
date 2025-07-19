var express = require("express");
var router = express.Router();
var User = require("../models/user"); // ../ to move up one directory
var passport = require("passport");
const Contact = require("../models/contact");
var axios = require("axios");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { user: req.user });
});

/* GET contact page. */
router.get("/contact", (req, res, next) => {
  res.render("contact", { user: req.user });
});

/* GET latest page. */
router.get("/latest", (req, res, next) => {
  res.render("latest", { title: "Latest", user: req.user });
});

/* GET movies page */
router.get("/movies", (req, res, next) => {
  const movies = [
    /* movie objects */
  ]; // Replace with TMDB or mock data
  res.render("search", { title: "Movies", items: movies, user: req.user });
});

/* GET series page */
router.get("/series", (req, res, next) => {
  const series = [
    /* series objects */
  ];
  res.render("search", { title: "TV Series", items: series, user: req.user });
});

/* GET info page. */
router.get('/info', (req, res) => {
    res.render('info', { 
        title: 'Movie/Show Info',
        user: req.user,
    });
});

/* GET favorites page */
router.get("/favorites", (req, res, next) => {
  const favorites = [
    /* user's favorite items */
  ];
  res.render("search", {
    title: "Favorites",
    items: favorites,
    isFavoritesPage: true,
    user: req.user,
  });
});

/* GET login page. */
router.get("/login", (req, res, next) => {
  res.render("login", { title: "Login" });
});

/* POST login page. */
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/latest",
    failureRedirect: "/login",
    failureMessage: "Invalid username or password.",
  })
);

/* GET signup page. */
router.get("/signup", (req, res, next) => {
  res.render("signup", { title: "Sign Up" });
});

/* POST signup page. */
router.post("/signup", (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function (error, newUser) {
      if (error) {
        console.error("Error registering user:", error);
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

/* GET handler for /logout. */
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    res.redirect("/login");
  });
});

/* GET handler for /github. */
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

/* GET handler for /github/callback */
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res, next) => {
    res.redirect("/latest");
  }
);

/* GET handler for /google. */
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

/* GET handler for /google/callback */
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/latest");
  }
);

/* GET handler for search bar */
router.get("/search", async (req, res, next) => {
  const query = req.query.q;

  if (!query) {
    return res.render("search", { title: "Search", items: [], user: req.user });
  }

  try {
    const response = await axios.get("https://api.themoviedb.org/3/search/multi", {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: query,
      },
    });

    const items = response.data.results
      .filter(item => item.poster_path && (item.media_type === "movie" || item.media_type === "tv"))
      .map(item => ({
        title: item.title || item.name,
        poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
      }));

    res.render("search", {
      title: `Search Results for "${query}"`,
      items,
      user: req.user,
    });
  } catch (error) {
    console.error("TMDB search error:", error);
    next(error);
  }
});

/* POST contact page. */
router.post("/contact", async (req, res, next) => {
  const { fullname, email, phone, message } = req.body;

  try {
    const newContact = new Contact({ fullname, email, phone, message });
    await newContact.save();

    res.render("contact", {
      title: "Contact",
      user: req.user,
      successMessage: "Thanks for your message! We'll get back to you soon.",
    });
  } catch (error) {
    console.error("Error saving contact form:", error);
    next(error); 
  }
});


module.exports = router;