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

const InstituteSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
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
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    Address: { type: AddressSchema },
  },
  { timestamps: true }
);

const InstituteModel = mongoose.model("institutes", InstituteSchema);
module.exports = InstituteModel;
