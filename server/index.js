const port = process.env.PORT || 3000;
const app = require("./app");
const {
  syncAndSeed,
  models: { Campuses, Students },
} = require("../db/server");

const start = async () => {
  try {
    await syncAndSeed();
    app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
