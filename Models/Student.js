const mongoose = require("mongoose");
const { Schema } = mongoose;
const StudentSchema = new Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
    },
    FirstName: {
      type: String,
      required: true,
    },
    MiddleName: {
      type: String,
    },
    LastName: {
      type: String,
    },
    Email: {
      type: String,
      required: true,
    },
    isEmailVerified: { type: Boolean },
    PhoneNo: {
      type: String,
    },
    Password: {
      type: String,
    },
    ProfilePicture: {
      type: String,
    },
    AccountType: {
      type: String,
    },
    Questions: {
      type: [String],
    },
    Discussion: {
      type: [Object],
    },
  },
  { timestamps: true }
);

const StudentModel = mongoose.model("Students", StudentSchema);
module.exports = StudentModel;
