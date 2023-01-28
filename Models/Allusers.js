const mongoose = require("mongoose");
const { Schema } = mongoose;
const AllUsersSchema = new Schema(
  {
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
    },
    profileId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    userRole: {
      type: String,
      default: null,
    },
    isEmailVerified: { type: Boolean, default: false },
    AccountType: {
      type: String,
    },
    ProfilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);
const AllUsersModel = mongoose.model("AllUsers", AllUsersSchema);
module.exports = AllUsersModel;
