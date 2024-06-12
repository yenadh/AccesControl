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
      `SELECT 
        udm.id,
        udm.user_id,
        udm.door_id,
        d.doorName,
        udm.location_id,
        l.locationName,
        udm.last_updated_date,
        udm.updated_user
    FROM 
      user_door_mapping udm
    JOIN 
      door_table d ON udm.door_id = d.id
    JOIN 
      locationtable l ON udm.location_id = l.id
    WHERE 
      udm.user_id = ?;`,
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

  getLocation: (callBack) => {
    pool.query(
      `Select id,locationName from locationtable`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
