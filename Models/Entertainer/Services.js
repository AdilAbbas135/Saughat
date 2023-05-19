const mongoose = require("mongoose");
const { Schema } = mongoose;
const ServicesSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
    },
    Picture: {
      type: String,
    },
    isActive: { type: Boolean, default: false },
    EntertainerId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    EntertainerRole: {
      type: String,
    },
  },
  { timestamps: true }
);

const EntertainerServicesModel = mongoose.model(
  "entertainer-services",
  ServicesSchema
);
module.exports = EntertainerServicesModel;
