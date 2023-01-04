const express = require("express");
const app = express();
const connect_to_db = require("./db");
var cors = require("cors");
var cookieParser = require("cookie-parser");

// Middlewears
connect_to_db();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.listen(8800, () => {
  console.log("the app is running at port " + 8800);
});

// STUDENT ROUTES
app.use("/student", require("./Routes/Student/student"));
app.use("/student/login/google", require("./Routes/Student/googleLogin"));

// QAHUB Route
app.use("/qahub", require("./Routes/QaHub/qahub"));
