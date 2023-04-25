const mongoose = require("mongoose");
const { Schema } = mongoose;

const AddressSchema = new Schema(
  {
    StreetAddress: {
      type: String,
    },
    Province: {
      type: String,
    },
    City: { type: String },
    ZipCode: { type: String },
  },
  { timestamps: true }
);

const TeacherSchema = new Schema(
  {
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
    Gender: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    ProfilePicture: {
      type: String,
    },
    CoverPicture: {
      type: String,
    },
    AccountType: {
      type: String,
    },
    Description: {
      type: String,
    },
    Tutions: {
      type: [Schema.Types.ObjectId],
    },
    Discussion: {
      type: [Object],
    },
    Address: { type: AddressSchema },
  },
  { timestamps: true }
);

const TeacherModel = mongoose.model("Teachers", TeacherSchema);
module.exports = TeacherModel;
