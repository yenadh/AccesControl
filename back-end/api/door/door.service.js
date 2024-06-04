const { query } = require("express");
const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO door_table (doorName, locationId ,latitude ,longitude, createdUser, createdDate,status) VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [
        data.doorName,
        data.locationId,
        data.latitude,
        data.longitude,
        data.createdUser,
        data.createdDate,
        data.status,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getDoor: (callBack) => {
    pool.query(
      `SELECT door_table.id, door_table.doorName, door_table.latitude, door_table.longitude, door_table.locationId, locationtable.locationName, door_table.createdUser, door_table.createdDate, door_table.updatedUser, door_table.updatedDate, door_table.status
    FROM door_table
    INNER JOIN locationtable ON door_table.locationId = locationtable.id;`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getDoorById: (id, callBack) => {
    pool.query(
      `Select * from door_table where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateDoor: (data, callBack) => {
    pool.query(
      `UPDATE door_table SET doorName = ?, locationId = ?, latitude = ?, longitude = ?, updatedUser = ?, updatedDate = ?, status = ? WHERE id = ?`,
      [
        data.doorName,
        data.locationId,
        data.latitude,
        data.longitude,
        data.updatedUser,
        data.updatedDate,
        data.status,
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

  deleteDoor: (data, callBack) => {
    pool.query(
      `DELETE FROM door_table WHERE id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getLocation: (callBack) => {
    pool.query(
      `SELECT id,locationName FROM locationtable WHERE status = 1`,
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
