const {
  getDoorCurrentStateById,
  getDoorPositionById,
} = require("./logDoors.controller");
const { createAndHandleDoorLog } = require("../../utils/createDoorLog");
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
router.get("/position/:id", getDoorPositionById);
router.post("/log", createAndHandleDoorLog);

module.exports = router;
