require("dotenv").config();
const express = require("express");

const userRouter = require("./api/user/user.router");
const locationRouter = require("./api/location/location.router");
const doorRouter = require("./api/door/door.router");
const logDoors = require("./api/logDoors/logDoors.router");
const mapDoors = require("./api/mapDoors/mapDoors.router");

const app = express();
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/location", locationRouter);
app.use("/api/door", doorRouter);
app.use("/api/logDoors", logDoors);
app.use("/api/mapDoor", mapDoors);

// app.listen(process.env.APP_PORT, "192.168.2.143", () => {
//   console.log("Connected to backend port: ", process.env.APP_PORT);
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.APP_PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${process.env.APP_PORT}`);
});
