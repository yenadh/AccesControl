const {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  login,
  logOut,
  getEmail,
  getEmailbyId,
  verifyToken,
  resetPassword
} = require("./user.controller");
const router = require("express").Router();
const {checkToken} = require ('../../auth/token_validation')
const cors = require('cors')
const cookieParser = require('cookie-parser');

router.use (cookieParser())


router.use(cors({
  origin:["http://localhost:5173"],
  methods:["POST, GET, DELETE, PUT"],
  credentials:true
}));


router.post("/",checkToken , createUser);
router.get("/",checkToken , getUsers);
router.put("/",checkToken, updateUser);
router.delete("/:id",checkToken , deleteUser);

router.get("/:id",checkToken, getUserById);
router.get("/email/:email",checkToken, getEmail);
router.get("/emailId/:id",checkToken, getEmailbyId);

router.post("/login", login);
router.get("/login/logOut",checkToken , logOut);
router.get("/login/userData" ,verifyToken);

router.put("/password", checkToken, resetPassword);

module.exports = router;
