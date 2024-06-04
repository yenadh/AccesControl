const {getDoorCurrentStateById, updateDoorCurrentState, createDoorLog, log} = require("./logDoors.controller")
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const cors = require("cors");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST, GET, DELETE, PUT"],
    credentials: true,
  })
);

router.get("/:id", getDoorCurrentStateById);
router.put("/", updateDoorCurrentState);
router.post("/", createDoorLog);
router.post("/log/log", log);

module.exports = router