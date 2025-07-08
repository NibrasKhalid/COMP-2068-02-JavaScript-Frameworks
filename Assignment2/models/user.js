// This is a mongoDB user connection file.
const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const dataSchemaObject = {
    username: { type: String},
    password: { type: String}, // Passwords should be hashed for security
};
const schema = mongoose.Schema(dataSchemaObject);
schema.plugin(plm); // Adds username and password hashing functionality

// To enhance with plugin
module.exports = mongoose.model('User', schema);