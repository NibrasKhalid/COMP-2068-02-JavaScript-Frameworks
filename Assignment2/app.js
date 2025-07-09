var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// Import mongoose and configurations onjects
var configs = require("./configs/global"); // ./ means root directory
var mongoose = require("mongoose");

// Import passport and session modules
var session = require("express-session");
var passport = require("passport");

// Import Github passport
var githubStrategy = require("passport-github2").Strategy;

// Import Google passport
const googleStrategy = require("passport-google-oauth20").Strategy;

// Initialize user model and cofigure passport
var User = require("./models/user");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Middleware configurations
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// initialize session
app.use(
  session({
    secret: "StreamSecret",
    resave: false,
    saveUninitialized: true,
  })
);

// initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// initialize basic strategy
passport.use(User.createStrategy());


// initialize GitHub OAuth strategy
passport.use(
  new githubStrategy(
    {
      clientID: configs.github.clientId,
      clientSecret: configs.github.clientSecret,
      callbackURL: configs.github.callbackUrl,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ oauthId: profile.id });
        if (user) return done(null, user);

        const newUser = new User({
          username: profile.username,
          oauthId: profile.id,
          oauthProvider: "Github",
          created: Date.now(),
        });

        const savedUser = await newUser.save();
        return done(null, savedUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// initialize Google OAuth strategy
passport.use(
  new googleStrategy(
    {
      clientID: configs.google.clientId,
      clientSecret: configs.google.clientSecret,
      callbackURL: configs.google.callbackUrl,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ oauthId: profile.id });
        if (user) return done(null, user);

        const newUser = new User({
          username: profile.displayName,
          oauthId: profile.id,
          oauthProvider: "Google",
          created: Date.now(),
        });

        const savedUser = await newUser.save();
        return done(null, savedUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// serialize/deserialize user (read/write to session)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

mongoose
  .connect(configs.connectionStrings.mongoDb)
  .then(() => {
    console.log("Successfully Connected to mongoDB");
  })
  .catch((err) => {
    console.error("Error Connecting to mongoDB:", err);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
