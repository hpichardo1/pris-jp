const express = require("express");
const path = require("path");
const {
  models: { Campuses, Students },
} = require("../db/server");

const app = express();

// static middleware
app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use(express.static(path.join(__dirname, "../public")));

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

app.get("/api/campuses/:id", async (req, res, next) => {
  try {
    const campus = await Campuses.findOne({
      include: [Students],
      where: { id: req.params.id },
    });
    res.send(campus);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/students/:id", async (req, res, next) => {
  try {
    const student = await Students.findOne({
      include: [Campuses],
      where: { id: req.params.id },
    });
    res.send(student);
  } catch (error) {
    console.log(error);
  }
});

//-----------delete API routes
app.delete("/api/campuses/delete/:id", async (req, res, next) => {
  try {
    const deleteCampus = await Campuses.findByPk(req.params.id);
    deleteCampus.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/api/students/delete/:id", async (req, res, next) => {
  try {
    const deleteStudent = await Students.findByPk(req.params.id);
    deleteStudent.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;
