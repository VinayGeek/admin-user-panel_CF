const app = require("./app");
const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/task")
    .then(() => console.log("DB Working ✅"))
    .catch((err) => console.log(err));
};

connect();

app.listen(8080, () => {
  console.log("server is running ✅");
});
