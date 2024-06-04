const { query } = require("express");
const pool = require("../../config/database");
const {createAndHandleDoorLog } = require('../../utils/createDoorLog');

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

  updateDoorCurrentState: (data, callBack) => {
    pool.query(
      `UPDATE door_table SET currentState = ? WHERE id = ?`,
      [data.currentState, data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  createDoorLog: (data, callBack) => {
    pool.query(
      `INSERT INTO door_log_table (userId, doorId, Time, currentStatus) VALUES (?, ?, ?, ?);`,
      [data.userId, data.doorId, data.Time, data.currentStatus],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  log: (data,callBack) => {    
    const formatter = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Colombo",
    });
    const currentDate = new Date();
    const formatDateTime = formatter.format(currentDate);
    const openTime = formatDateTime.toString();   
    try {
      createAndHandleDoorLog({
        userId: data.userId,
        doorId: data.doorId,
        Time: openTime,
        currentStatus: 1
    });      
    return callBack(null);
    } catch (error) {
      return callBack(error);
    }
  } 
 
};
