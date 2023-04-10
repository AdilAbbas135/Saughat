const express = require("express");
const app = express();
const connect_to_db = require("./db");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const PORT = 8800;

app.listen(PORT, () => {
  console.log("the app is running at port " + PORT);
});

// Middlewears
connect_to_db();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Create email account and login
app.use("/account", require("./Routes/auth/account"));
// LOGIN WITH GOOGLE ROUTE
app.use("/auth/login/google", require("./Routes/auth/googleLogin"));
// STUDENT ROUTES
app.use("/student", require("./Routes/Student/student"));
// Teacher ROUTES
app.use("/teacher", require("./Routes/Teacher/Teacher"));
app.use("/tutions", require("./Routes/Teacher/Tution"));
// QAHUB Route
app.use("/qahub", require("./Routes/QaHub/qahub"));
app.use("/qahub/rooms", require("./Routes/QaHub/Rooms/rooms"));
