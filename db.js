const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connect_to_db = async (req, res) => {
  dotenv.config();
  try {
    await mongoose.connect(process.env.database_url, (err, connect) => {
      if (err) {
        console.log("Error in Mongoose Connect");
        console.log(err);
      } else {
        console.log("connected to db successfullly");
      }
    });
  } catch (error) {
    return res
      .status(400)
      .json({ DbError: true, msg: "Error in connecting to database" });
  }
};

module.exports = connect_to_db;
