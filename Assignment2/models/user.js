// This is a mongoDB user connection file.
const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const dataSchemaObject = {
    username: { type: String},
    password: { type: String}, // Passwords should be hashed for security
    oauthId: { type: String, unique: true }, // For OAuth integration
    oauthProvider: { type: String }, // e.g., 'github'
    created: { type: Date}, // Automatically set the creation date
    favorites: [
        {
            id: String,          
            title: String,
            poster: String,
            media_type: String
        }
    ]
};
const schema = mongoose.Schema(dataSchemaObject);
schema.plugin(plm); // Adds username and password hashing functionality

// To enhance with plugin
module.exports = mongoose.model('User', schema);