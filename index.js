const express = require("express");
const app = express();

// Middlewears
app.use(express.json());

app.listen(8800, () => {
  console.log("the app is running at port " + 8800);
});

app.use("/student", require("./Routes/student"));
