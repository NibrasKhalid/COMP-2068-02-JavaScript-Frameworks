require("dotenv").config();

const configurations = {
    ConnectionStrings: {
        MongoDb: process.env.CONNECTION_STRING_MONGODB,
    },
};
module.exports = configurations