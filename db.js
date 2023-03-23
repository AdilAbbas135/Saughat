const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connect_to_db = (req, res) => {
  dotenv.config();
  try {
    mongoose.connect(process.env.database_url, () => {
      console.log("connected to db successfullly");
    });
  } catch (error) {
    return res
      .status(400)
      .json({ DbError: true, msg: "Error in connecting to database" });
  }
};

module.exports = connect_to_db;
