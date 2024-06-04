const pool = require("../../config/database");
const {
  create,
  getDoorById,
  getDoor,
  updateDoor,
  deleteDoor,
  getLocation
} = require("../door/door.service");

module.exports = {
  create: (req, res) => {
    const body = req.body;
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

  getDoorById: (req, res) => {
    const id = req.params.id;
    getDoorById(id, (err, results) => {
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

  getDoor: (req, res) => {
    getDoor((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json(results);
    });
  },

  updateDoor: (req, res) => {
    const body = req.body;
    updateDoor(body, (err, results) => {
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

  deleteDoor: (req, res) => {
    const id = req.params.id;
    deleteDoor({ id }, (err, results) => {
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

  getLocation: (req, res) => {
    getLocation((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json(results);
    });
  },
};
