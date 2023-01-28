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

//Create email account and login
app.use("/account", require("./Routes/auth/account"));

// LOGIN WITH GOOGLE ROUTE
app.use("/auth/login/google", require("./Routes/auth/googleLogin"));
// STUDENT ROUTES
app.use("/student", require("./Routes/Student/student"));

// QAHUB Route
app.use("/qahub", require("./Routes/QaHub/qahub"));
