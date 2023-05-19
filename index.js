const express = require("express");
const app = express();
const connect_to_db = require("./db");
var cors = require("cors");
// var cookieParser = require("cookie-parser");
const PORT = 8800;

app.listen(PORT, () => {
  console.log("the app is running at port " + PORT);
});

// Middlewears
connect_to_db();
app.use(express.json());
app.use(cors());
// app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

//Public Pages Routes
app.use("/find", require("./Routes/find"));
app.use("/booking", require("./Routes/Booking"));
//Create email account and login
app.use("/account", require("./Routes/auth/account"));
// LOGIN WITH GOOGLE ROUTE
app.use("/auth/login/google", require("./Routes/auth/googleLogin"));
// Hall Manager
app.use("/hall-manager", require("./Routes/Hall_Manager/HallManager"));
// Event Organizer
app.use("/event-organizer", require("./Routes/Event_Organizer/EventOrganizer"));
// Entertainer
app.use("/entertainer", require("./Routes/Entertainer/Entertainer"));
// Teacher ROUTES
// app.use("/teacher", require("./Routes/Teacher/Teacher"));
// app.use("/tutions", require("./Routes/Teacher/Tution"));

// Institute ROUTES
// app.use("/institute", require("./Routes/Institute/Institute"));

// QAHUB Route
// app.use("/qahub", require("./Routes/QaHub/qahub"));
// app.use("/qahub/rooms", require("./Routes/QaHub/Rooms/rooms"));
// app.use("/qahub/conversation", require("./Routes/QaHub/Rooms/messages"));
// app.use("/qahub/feedback", require("./Routes/QaHub/feedback"));
// Discussion Routes
// app.use("/discussion", require("./Routes/Discussion/index"));
