const express = require("express");
const app = express();
const connect_to_db = require("./db");
var cors = require("cors");

// Middlewears
connect_to_db();
app.use(express.json());
app.use(cors());

app.listen(8800, () => {
  console.log("the app is running at port " + 8800);
});

app.use("/student/login/google", require("./Routes/student"));
