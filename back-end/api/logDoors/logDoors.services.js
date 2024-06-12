const { query } = require("express");
const pool = require("../../config/database");
const { createAndHandleDoorLog } = require("../../utils/createDoorLog");

module.exports = {
  getDoorCurrentStateById: (id, callBack) => {
    pool.query(
      `Select currentState from door_table where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getDoorPositionById: (id, callBack) => {
    pool.query(
      `Select id,latitude,longitude from door_table where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  createDoorLog: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "INSERT INTO door_log_table (userId, doorId, Time, currentStatus) VALUES (?, ?, ?, ?);",
        [data.userId, data.doorId, data.Time, data.currentStatus],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        }
      );
    });
  },

  updateDoorCurrentState: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "UPDATE door_table SET currentState = ? WHERE id = ?",
        [data.currentState, data.id],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          resolve(results);
        }
      );
    });
  },
};
