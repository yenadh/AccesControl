const { query } = require("express");
const pool = require("../../config/database");
const jwt = require("jsonwebtoken");
//nex Added
const redis = require('redis');
const redisClient = redis.createClient();

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO usertable (firstName, lastName, userName, email, password, createdDate, createdUser, userType, userStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.firstName,
        data.lastName,
        data.userName,
        data.email,
        data.password,
        data.createdDate,
        data.createdUser,
        data.userType,
        data.userStatus,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: (callBack) => {
    pool.query(`Select * from usertable`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getUserById: (id, callBack) => {
    pool.query(
      `Select * from usertable where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateUser: (data, callBack) => {
    pool.query(
      `UPDATE usertable SET firstName = ?, lastName = ?, userName = ?, email = ?, updatedDate = ?, userType = ?, userStatus = ? WHERE id = ?`,
      [
        data.firstName,
        data.lastName,
        data.userName,
        data.email,
        data.updatedDate,
        data.userType,
        data.userStatus,
        data.id,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `DELETE FROM usertable WHERE id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getUserNameById: (userName, callBack) => {
    pool.query(
      `SELECT * FROM usertable WHERE userName = ?`,
      [userName],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM usertable WHERE email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getEmailbyId: (id, callBack) => {
    pool.query(
      `Select email from usertable where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  verifyToken: (token, callback) => {
    jwt.verify(token, "1234qwer", (err, decoded) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, decoded.result);
    });
  },

  resetPassword: (data, callBack) => {
    pool.query(
      `UPDATE usertable SET password = ? WHERE id = ?`,
      [data.password, data.id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  
};
