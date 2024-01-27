const mongoose = require("mongoose");
require("dotenv").config();

mongodb = () => {
  mongoose
    .connect(
      `mongodb+srv://bhumiksoni009:${process.env.MONGO_DB_PASSWORD}@cluster0.neblxku.mongodb.net/`
    )
    .then(() => console.log("Connected to MongoDb"))
    .catch((err) => console.log("error connecting to the db.", err));
};

module.exports = {
  mongodb,
};
