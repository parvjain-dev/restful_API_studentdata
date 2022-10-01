const express = require("express");
require("./db/conn");
// const Student = require("./models/students");
const studentRouter = require("./routers/student");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// 3: we need to register our router
app.use(studentRouter);

app.listen(port, () => {
  console.log("conection successful");
});
