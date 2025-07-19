// Naming convention > controllers/routers are plural
// Import express and create router object
const express = require("express");
const router = express.Router();
// Import mongoose model to be used
const Project = require("../models/project");
// Configure GET/POST handlers
// Path relative to the one configured in app.js > /projects
// GET /api/projects/
router.get("/", async (req, res, next) => {
  // retrieve ALL data, and sort by dueDate
  let projects = await Project.find().sort([["dueDate", "descending"]]);
  res.status(200).json(projects); // HTTP status code 200 OK

});
module.exports = router;