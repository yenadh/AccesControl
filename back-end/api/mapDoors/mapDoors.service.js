const { query } = require("express");
const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO user_door_mapping (user_id, door_id, location_id, last_updated_date, updated_user) VALUES (?,?,?,?,?)`,
      [
        data.user_id,
        data.door_id,
        data.location_id,
        data.last_updated_date,
        data.updated_user,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getDoorMapById: (id, callBack) => {
    pool.query(
      `Select * from user_door_mapping where user_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getMapDoor: (callBack) => {
    pool.query(
      `Select * from user_door_mapping`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteMapDoor: (userId, doorId, callBack) => {
    pool.query(
      `DELETE FROM user_door_mapping WHERE user_id = ? AND door_id = ?`,
      [userId, doorId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
