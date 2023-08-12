const Router = require("express").Router();
const { createUser, loginUser } = require("../controllers/user");
const {uploadFile} = require("../middlewares/multerUpload")

Router.route("/register-user").post(uploadFile.single("profile"), createUser);
Router.route("/login-user").post(loginUser);

module.exports = Router;
