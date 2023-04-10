const { Schema } = mongoose;
const MessageSchema = new Schema(
  {
    SenderId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    ReceiverId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    Message: { type: String },
  },
  { timestamps: true }
);

const MessagesModel = mongoose.model("messages", MessageSchema);
module.exports = MessagesModel;
