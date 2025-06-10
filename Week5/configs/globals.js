// This is global configuration object, i'll use it to store global settings for the app including environment variables
require ('dotenv').config();

const configuration = {
    // Environment variables
    ConnectionStrings: {
        MongoDB: process.env.CONNECTION_STRING_MONGODB,
    },
}
module.exports = configuration;