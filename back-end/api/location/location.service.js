const { query } = require("express");
const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO locationtable (locationName,city,address,createdUser, createdDate,status) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.locationName,
        data.city,
        data.address,
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

  getLocation: (callBack) => {
    pool.query(`Select * from locationtable`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getLocationById: (id, callBack) => {
    pool.query(
      `Select * from locationtable where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateLocation: (data, callBack) => {
    pool.query(
      `UPDATE locationtable SET locationName = ?, city = ?, address = ?, updatedUser = ?, updatedDate = ?, status = ? WHERE id = ?`,
      [
        data.locationName,
        data.city,
        data.address,
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

  deleteLocation: (data, callBack) => {
    pool.query(
      `DELETE FROM locationtable WHERE id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getDoorById: (id, callBack) => {
    pool.query(
      `SELECT id,doorName,locationId FROM door_table WHERE status = 1 AND locationId = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
