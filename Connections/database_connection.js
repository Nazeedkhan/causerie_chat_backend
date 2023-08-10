const mongoose = require("mongoose");

const db = mongoose
  .connect(process.env.MONGO_CAUSERIE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Causerie MongoDB is Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = db;
