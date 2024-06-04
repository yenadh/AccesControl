const {
  create,
  getDoorById,
  getDoor,
  updateDoor,
  deleteDoor,
  getLocation
} = require("./door.controller");
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

router.post("/", checkToken, create);
router.get("/", checkToken, getDoor);
router.put("/", checkToken, updateDoor);
router.delete("/:id", checkToken, deleteDoor);

router.get("/:id", checkToken, getDoorById);
router.get("/location/data", checkToken, getLocation);

module.exports = router;
