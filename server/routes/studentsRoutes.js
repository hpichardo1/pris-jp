const router = require("express").Router();
const {
  models: { Students, Campuses },
} = require("../db/server");

router.get("/students", async (req, res, next) => {
  try {
    res.send(await Students.findAll());
  } catch (error) {
    next(error);
  }
});

router.get("/students/:id", async (req, res, next) => {
  try {
    const student = await Students.findOne({
      include: Campuses,
      where: { id: req.params.id },
    });
    res.send(student);
  } catch (error) {
    next(error);
  }
});

router.delete("/students/:id", async (req, res, next) => {
  try {
    const deleteStudent = await Students.findByPk(req.params.id);
    await deleteStudent.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.post("/students", async (req, res, next) => {
  try {
    res.send(await Students.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.put("/students/:id", async (req, res, next) => {
  try {
    let student = await Students.findByPk(req.params.id);
    //console.log('first-->', student)
    await student.update({ campusId: null })
    student = await Students.findByPk(req.params.id);
    //console.log('second-->', student)

    res.send(student)
  } catch (error) {
    next(error);
  }
});

module.exports = router;
ß