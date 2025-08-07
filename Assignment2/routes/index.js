var express = require("express");
var router = express.Router();
var User = require("../models/user"); // ../ to move up one directory
var passport = require("passport");
const Contact = require("../models/contact");
var axios = require("axios");

const today = new Date().toISOString().split('T')[0];


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { user: req.user });
});

/* GET contact page. */
router.get("/contact", (req, res, next) => {
  res.render("contact", { user: req.user });
});

/* GET latest page. */
router.get("/latest", async (req, res) => {
  try {
    const trendingUrl = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.TMDB_API_KEY}`;
    const response = await axios.get(trendingUrl);
    const results = response.data.results;

    const items = [];
    const carousel = [];

    for (const item of results) {
      if (!item.poster_path) continue;

      const media_type = item.media_type === 'tv' ? 'tv' : 'movie';
      const title = item.title || item.name;
      const release_date = item.release_date || item.first_air_date;

      if (new Date(release_date) > new Date()) continue;

      const movieObj = {
        id: item.id,
        title,
        poster: `https://image.tmdb.org/t/p/w780${item.poster_path}`,
        media_type
      };

      items.push(movieObj);

      if (carousel.length < 3) {
        carousel.push({
          ...movieObj,
          backdrop: item.backdrop_path
            ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
            : `https://image.tmdb.org/t/p/original${item.poster_path}`,
          overview: item.overview
        });
      }
    }

    res.render("latest", {
      title: "Trending Now",
      items,
      carousel,
      user: req.user
    });

  } catch (err) {
    console.error("Error fetching trending content:", err.message);
    res.render("latest", {
      title: "Trending Now",
      items: [],
      carousel: [],
      user: req.user,
      error: "Something went wrong while fetching trending items."
    });
  }
});

/* GET movies page */
router.get("/movies", async (req, res) => {
  const movies = [];

  // this gets the page count from query or just uses default as 3
  const pageCount = parseInt(req.query.page) || 3;

  try {
    for (let i = 1; i <= pageCount; i++) {
      // fetch movies from the TMDB API and filters them by release date
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&include_adult=false&page=${i}&sort_by=release_date.desc&release_date.lte=${today}`;
      const response = await axios.get(url);
      const results = response.data.results;

      results.forEach((movie) => {
        if (movie.poster_path) {
          movies.push({
            id: movie.id,
            title: movie.title,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            media_type: "movie",
            isMoviesPage: true
          });
        }
      });
    }

    // adds movies from the next page
    res.render("search", {
      title: "Movies",
      items: movies,
      user: req.user,
      nextPage: pageCount + 1,
      isMoviesPage: true
    });

  } catch (err) {
    console.log("Error getting movies:", err.message);
    res.render("search", {
      title: "Movies",
      items: [],
      user: req.user,
      error: "Something went wrong.",
      nextPage: 3
    });
  }
});

/* GET series page */
router.get("/series", async (req, res) => {
  const series = [];
  const pageCount = parseInt(req.query.page) || 3;

  try {
    for (let i = 1; i <= pageCount; i++) {
      // Fetch TV shows from TMDB
      const url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&include_adult=false&include_null_first_air_dates=false&page=${i}&sort_by=first_air_date.desc&first_air_date.lte=${today}`;
      const response = await axios.get(url);
      const results = response.data.results;

      results.forEach((show) => {
        if (show.poster_path) {
          series.push({
            id: show.id,
            title: show.name,
            poster: `https://image.tmdb.org/t/p/w500${show.poster_path}`,
            media_type: "tv"
          });
        }
      });
    }

    res.render("search", {
      title: "TV Shows",
      items: series,
      user: req.user,
      nextPage: pageCount + 1,
      isSeriesPage: true
    });

  } catch (err) {
    console.log("Error getting series:", err.message);
    res.render("search", {
      title: "TV Shows",
      items: [],
      user: req.user,
      error: "Something went wrong.",
      nextPage: 3,
      isSeriesPage: true
    });
  }
});

/* GET info page. */
router.get('/info/:type/:id', async (req, res) => {
  const { type, id: itemId } = req.params;

  if (!itemId || !['movie', 'tv'].includes(type)) {
    return res.status(400).render('info', {
      title: 'Error',
      message: 'Invalid ID or type.',
      user: req.user
    });
  }

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/${type}/${itemId}`, {
      params: { api_key: process.env.TMDB_API_KEY }
    });

    const item = response.data;

    res.render('info', {
      title: item.title || item.name,
      poster: item.poster_path? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '/images/placeholder.jpg',
      type: type === 'tv' ? 'TV Series' : 'Movie',
      genre: item.genres ? item.genres.map(g => g.name).join(', ') : 'Unknown',
      duration: item.runtime
        ? `${item.runtime} min`
        : item.episode_run_time
        ? `${item.episode_run_time[0]} min`
        : 'N/A',
      description: item.overview || 'No description available',
      releaseDate: item.release_date || item.first_air_date || 'Unknown',
      rating: item.vote_average ? item.vote_average.toFixed(1) : 'N/A',
      country: item.production_countries?.[0]?.name || item.origin_country?.[0] || 'Unknown',
      user: req.user
    });

  } catch (error) {
    console.error("Error fetching item details:", error.message);
    res.status(500).render('info', {
      title: 'Error',
      message: 'Could not load item details.',
      user: req.user
    });
  }
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
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

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
    return res.render("search", {
      title: "Search",
      items: [],
      user: req.user
    });
  }

  try {
    const response = await axios.get("https://api.themoviedb.org/3/search/multi", {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: query,
      },
    });

    const items = response.data.results
      .filter(
        (item) =>
          item.poster_path &&
          (item.media_type === "movie" || item.media_type === "tv")
      )
      .map((item) => ({
        id: item.id,
        title: item.title || item.name,
        poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        media_type: item.media_type === "tv" ? "tv" : "movie"
      }));

    res.render("search", {
      title: `Search Results for "${query}"`,
      items,
      user: req.user,
    });

  } catch (error) {
    console.error("TMDB search error:", error);
    res.render("search", {
      title: "Search Error",
      items: [],
      user: req.user,
      error: "Failed to fetch search results",
    });
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