const {
  getDoorMapById,
  getMapDoor,
  deleteMapDoor,
  create,
  getLocation,
} = require("./mapDoors..controller");
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
router.get("/:id", getDoorMapById);
router.get("/", getMapDoor);
router.delete("/", deleteMapDoor);
router.get("/location/location", getLocation);

module.exports = router;
