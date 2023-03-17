const TeacherModel = require("../Models/Teacher/Teacher");

const VerifyTeacher = async (req, res, next) => {
  if (req.method === "POST") {
    const Teacher = await TeacherModel.findOne({
      _id: req?.user?.profileId,
      userId: req?.user?.userId,
    });
    if (Teacher) {
      next();
    } else {
      res.status(404).json({
        Success: false,
        error: "Error in Finding the Teacher",
      });
    }
  } else {
    res.status(404).json({
      Success: false,
      error: "You are not allowed to find the teacher with this request",
    });
  }
};

module.exports = VerifyTeacher;
