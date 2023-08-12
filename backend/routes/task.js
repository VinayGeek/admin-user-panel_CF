const { createTask, editTask, deleteTask } = require("../controllers/task");
const { verifyToken } = require("../middlewares/jwtCheck");
const {uploadFile} = require("../middlewares/multerUpload")

const Router = require("express").Router();

Router.route("/create-task").post(verifyToken, uploadFile.single("attachment"), createTask);
Router.route("/edit-task").put(verifyToken, editTask);
Router.route("/delete-task").delete(verifyToken, deleteTask);

module.exports = Router;
