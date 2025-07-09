require("dotenv").config();

const configurations = {
  connectionStrings: {
    mongoDb: process.env.CONNECTION_STRING_MONGODB,
  },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackUrl:
      process.env.GITHUB_CALLBACK_URL ||
      "http://localhost:3000/github/callback",
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl:
      process.env.GOOGLE_CALLBACK_URL ||
      "http://localhost:3000/google/callback",
  },
};

module.exports = configurations;
