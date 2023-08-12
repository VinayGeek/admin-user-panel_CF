const express = require("express");
const app = express();

const userRoute = require("./routes/user");
const taskRoute = require("./routes/task");
const reportRoute = require("./routes/exporter");

app.use("/profile", express.static("uploads"))

app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/task", taskRoute);
app.use("/api/report", reportRoute);

module.exports = app;
