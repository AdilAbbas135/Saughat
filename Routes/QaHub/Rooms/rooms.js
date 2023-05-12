const express = require("express");
const VerifyToken = require("../../../Middlewear/VerifyToken");
const StudentModel = require("../../../Models/HallManager");
const RoomModel = require("../../../Models/Conversation/Rooms");
const TeacherModel = require("../../../Models/Teacher/Teacher");
const { default: mongoose } = require("mongoose");
const router = express.Router();

//  ROUTE 1: CREATE A ROOM WITH STUDENT AND TEACHERS ID
//  ROUTE 2: FIND THE ROOMS OF THE SPECIFIC TEACHER THAT HAS BEEN CREATED
//  ROUTE 3: CLOSE OR DELETE THE ROOM
//  Route 4: FIND THE UPDATED ROOMS MEAN JO K SOCKET SE DATA LE K AAGE BHEJNE HAIN

// ROUTE 1: CREATE A ROOM WITH STUDENT AND TEACHERS ID
router.post("/createroom", VerifyToken, async (req, res) => {
  try {
    const FindStudent = await StudentModel.findById(req.user.profileId);
    if (!FindStudent) {
      return res.status(404).json({ error: "Student not found" });
    } else {
      const FindTeacher = await TeacherModel.findById(req.body.data.TeacherId);
      if (!FindTeacher) {
        return res.status(404).json({ error: "Teacher not found" });
      } else {
        const CreateRoom = await RoomModel.create({
          StudentId: req.user.profileId,
          TeacherId: req.body.data.TeacherId,
          QuestionId: req.body.data.QuestionId,
          RoomStatus: true,
        });
        if (CreateRoom) {
          return res
            .status(200)
            .json({ message: "Room Created", Room: CreateRoom });
        } else {
          return res.status(400).json({ error: "Error in Creating Room" });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Internal Server Error" });
  }
});

//  ROUTE 2: FIND THE ROOMS OF THE SPECIFIC TEACHER THAT HAS BEEN CREATED
router.post("/get-rooms", VerifyToken, async (req, res) => {
  try {
    const rooms = await RoomModel.aggregate([
      {
        $match: {
          TeacherId: mongoose.Types.ObjectId(req.user.profileId),
          RoomStatus: true,
        },
      },
      {
        $lookup: {
          from: "qahubs",
          localField: "QuestionId",
          foreignField: "_id",
          as: "Question",
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "StudentId",
          foreignField: "_id",
          as: "Student",
        },
      },
      // {
      //   $project: {
      //     "Question.Title": 1,
      //     "Question.Description": 1,
      //     "Question.isActive": 1,
      //   },
      // },
    ]);
    return res.status(200).json(rooms);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//  ROUTE 3: CLOSE OR DELETE THE ROOM
router.put("/close-room", async (req, res) => {
  try {
    await RoomModel.findByIdAndUpdate(req.body.RoomId, { RoomStatus: false });
    return res.status(200).json({ message: "Room Closed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//  Route 4: FIND THE UPDATED ROOMS MEAN JO K SOCKET SE DATA LE K AAGE BHEJNE HAIN
router.post("/getUpdates", VerifyToken, async (req, res) => {
  try {
    const rooms = await RoomModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.body.RoomId) } },
      {
        $lookup: {
          from: "qahubs",
          localField: "QuestionId",
          foreignField: "_id",
          as: "Question",
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "StudentId",
          foreignField: "_id",
          as: "Student",
        },
      },
    ]);
    return res.status(200).json(rooms[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
