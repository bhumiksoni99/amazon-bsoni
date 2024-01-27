const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { mongodb } = require("./mongoose");
const userRouter = require("./endpoints/user");

mongodb();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
});

app.use(userRouter);
