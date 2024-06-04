const pool = require("../../config/database");
const {
  create,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  getUserNameById,
  getEmail,
  getEmailbyId,
  verifyToken,
  resetPassword,
  invalidateToken
} = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const {sign} = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found",
        });
      }
      return res.json(results);
    });
  },

  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json(results);
    });
  },

  updateUser: (req, res) => {
    const body = req.body;
    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Updated Failed",
        });
      }
      return res.json({
        success: 1,
        data: "Updated Succsess",
      });
    });
  },

  deleteUser: (req, res) => {
    const id = req.params.id;
    deleteUser({ id }, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not found",
        });
      }
      return res.json({
        success: 1,
        message: "User deleted successfully",
      });
    });
  },

  login: (req, res) => {
    const body = req.body;
    getUserNameById(body.userName, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No records in the Database enter different User Name and Password",
        });
      }

      if (results.userType === "Admin" && results.userStatus === 1) {
        const result = compareSync(body.password, results.password);
        if (result) {
          results.password = undefined; //hardCoded need to change|
          const jsonwebtoken = sign({ result: results }, "1234qwer", {
            expiresIn: "2d",
          });
          res.cookie("token", jsonwebtoken);
          return res.json({
            success: 1,
            message: "Login succsessfully",
            token: jsonwebtoken,
            passwords: results.password,
          });
        } else {
          return res.json({
            success: 0,
            message: "Invallid Email or Password",
            passwords: results.password,
          });
        }
      } else {
        return res.json({
          success: 0,
          message: "Invalid User or User is not Active",
          passwords: results.password,
        });
      }
    });
  },

  logOut: (req, res) => {
    res.clearCookie('token'); // Corrected method name
    return res.json({
      success: 1,
      message: "Ok",
    });
},


  getEmail: (req, res) => {
    const email = req.params.email;
    getEmail(email, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 1,
          message: "Ok",
        });
      }
      return res.json({
        success: 0,
        message: "No",
      });
    });
  },

  getEmailbyId: (req, res) => {
    const id = req.params.id;
    getEmailbyId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
        });
      }
      return res.json(results);
    });
  },

  verifyToken: (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(403)
        .json({ success: 0, message: "Token not provided" });
    }
    verifyToken(token, (err, userData) => {
      if (err) {
        return res
          .status(401)
          .json({ success: 0, message: "Failed to authenticate token" });
      }
      return res.json({ success: 1, userData });
    });
  },

  resetPassword: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    resetPassword(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: 0, data: "Server Error" }); // Send proper error response
      }
      if (results.affectedRows === 0) { // Check for affectedRows property
        return res.json({
          success: 0,
          data: "Password update Failed",
        });
      }
      return res.json({
        success: 1,
        data: "Password update Succeeded",
      });
    });
  },

  
  
};
