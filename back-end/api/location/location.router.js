const {
  create,
  getLocationById,
  getLocation,
  updateLocation,
  deleteLocation,
  getDoorById
} = require("../location/location.controller");
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
router.get("/", checkToken, getLocation);
router.put("/", checkToken, updateLocation);
router.delete("/:id", checkToken, deleteLocation);

router.get("/:id", checkToken, getLocationById);
router.get("/door/:id", checkToken, getDoorById);

module.exports = router;
