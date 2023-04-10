const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema(
  {
    QuestionId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    StudentId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    TeacherId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    RoomStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const RoomModel = mongoose.model("rooms", RoomSchema);
module.exports = RoomModel;
