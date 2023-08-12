const TaskDB = require("../models/task");
const UserDB = require("../models/user");

exports.createTask = async (req, res) => {
  const { title, due_date } = req.body;
  const attachment = req.file;

  const checkUser = await UserDB.findOne({ _id: req.user });
  if (!checkUser) return res.send("invalid token or user is no valid");

  if (title == "" || due_date == "" || attachment == "") {
    return res.status(400).json({
      success: false,
      message: "please provide all field",
      data: {},
    });
  }

  const addTaskData = await TaskDB.create({
    title,
    due_date,
    attachment: attachment.path,
    user: checkUser._id,
  });

  if (!addTaskData) {
    return res.status(400).json({
      success: false,
      message: "something went wrong",
      data: {},
    });
  }

  res.status(201).json({
    success: true,
    message: "task added successfully",
    data: addTaskData,
  });
};

exports.editTask = async (req, res) => {
  const checkUser = req.user;
  const task_id = req.query.task_id;
  const { title, due_date } = req.body;

  if (!checkUser || !task_id) {
    return res.send("no user or task id");
  }

  const updateTask = await TaskDB.findByIdAndUpdate(
    task_id,
    {
      title,
      due_date,
    },
    { new: true }
  );

  if (!updateTask) {
    return res.send("something went wrong");
  }

  res.status(200).json({
    success: true,
    message: "updated successfully",
    data: updateTask,
  });
};

exports.deleteTask = async (req, res) => {
  const checkUser = req.user;
  const task_id = req.query.task_id;

  if (!checkUser || !task_id) {
    return res.send("no user or task id");
  }

  const updateTask = await TaskDB.findByIdAndUpdate(
    task_id,
    {
      isDeleted: true,
    },
    { new: true }
  );

  if (!updateTask) {
    return res.send("something went wrong");
  }

  res.status(200).json({
    success: true,
    message: "updated successfully",
    data: updateTask,
  });
};
