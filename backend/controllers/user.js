const {
  HashedPasswordFunc,
  ComparePasswordFunc,
} = require("../helpers/hashing");
const { generateToken, verifyToken } = require("../middlewares/jwtCheck");
const UserDB = require("../models/user");
const TaskDB = require("../models/task");
const JWT = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const checkEmail = await UserDB.findOne({ email });

  if (checkEmail) return res.send("please send unique email");

  const profile = req.file;
  console.log(222222, profile);

  const HashedPassword = await HashedPasswordFunc(password);

  const userData = await UserDB.create({
    name,
    email,
    password: HashedPassword,
    image: profile.path,
  });

  if (!userData) {
    return res.status(400).json({
      success: false,
      data: {},
    });
  }

  res.status(201).json({
    success: true,
    data: userData,
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const userData = await UserDB.findOne({ email }).select("+password").lean();

  if (!userData) {
    return res.status(404).json({
      success: false,
      message: "email or password is invalid",
      data: {},
    });
  }

  const HashedPassword = await ComparePasswordFunc(password, userData.password);

  if (!HashedPassword) {
    return res.status(404).json({
      success: false,
      message: "email or password is invalid",
      data: {},
    });
  }

  const getUserTasks = await TaskDB.find({
    user: userData._id,
    isDeleted: false,
  });

  const token = generateToken({ _id: userData._id });

  userData["password"] = "";

  const finalData = Object.assign(userData, { task: getUserTasks });

  res.status(200).json({
    success: true,
    message: "login successfully",
    data: finalData,
    token,
  });
};
