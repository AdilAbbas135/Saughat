const express = require("express");
const MessagesModel = require("../../../Models/Conversation/Message");
const VerifyToken = require("../../../Middlewear/VerifyToken");
const RoomModel = require("../../../Models/Conversation/Rooms");
const router = express.Router();

router.post("/", VerifyToken, async (req, res) => {
  try {
    if (req.body.SenderId === req.user.profileId) {
      const RoomOpen = await RoomModel.findById(req.body.RoomId);
      if (RoomOpen.RoomStatus === true) {
        const messages = await MessagesModel.find({
          // SenderId: req.body.SenderId,
          // RecieverId: req.body.RecieverId,
          RoomId: req.body.RoomId,
        });
        return res.status(200).json(messages);
      } else {
        return res
          .status(200)
          .json({ error: true, msg: "Room Has been Closed" });
      }
    } else {
      return res
        .status(404)
        .json({ error: "Your are not allowed to View These message" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error in getting RooM Chat" });
  }
});

router.post("/send-message", VerifyToken, async (req, res) => {
  try {
    if (req.body.SenderId === req.user.profileId) {
      await MessagesModel.create({
        SenderId: req.body.SenderId,
        RecieverId: req.body.RecieverId,
        RoomId: req.body.RoomId,
        Message: req.body.Message,
      });
      return res.status(200).json({ message: "Message created successfully" });
    } else {
      return res
        .status(404)
        .json({ error: "Your are not allowed to Send this message" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
