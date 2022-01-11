const express = require("express");
const path = require("path");
const {
  models: { Campuses, Students },
} = require("../db/server");

const app = express();

// static middleware
app.use("/dist", express.static(path.join(__dirname, "../dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/api/campuses", async (req, res, next) => {
  try {
    res.send(await Campuses.findAll());
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/students", async (req, res, next) => {
  try {
    res.send(await Students.findAll());
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
