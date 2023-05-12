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

const EventOrganizerSchema = new Schema(
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

    Address: { type: AddressSchema },
  },
  { timestamps: true }
);

const EventOrganizerModel = mongoose.model(
  "event-organizers",
  EventOrganizerSchema
);
module.exports = EventOrganizerModel;
