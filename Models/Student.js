const mongoose = require("mongoose");
const { Schema } = mongoose;

const AddressSchema = new Schema({
  "Street Address": {
    type: String,
  },
  Province: {
    type: String,
  },
  City: { type: String },
  ZipCode: { type: String },
});

const StudentSchema = new Schema(
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
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },

    PhoneNo: {
      type: String,
    },
    ProfilePicture: {
      type: String,
    },
    AccountType: {
      type: String,
    },
    Questions: {
      type: [Schema.Types.ObjectId],
    },
    Discussion: {
      type: [Object],
    },
    Address: { type: AddressSchema },
  },
  { timestamps: true }
);

const StudentModel = mongoose.model("Students", StudentSchema);
module.exports = StudentModel;
