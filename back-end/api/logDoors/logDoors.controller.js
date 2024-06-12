const pool = require("../../config/database");
const {
  getDoorCurrentStateById,
  updateDoorCurrentState,
  createDoorLog,
  getDoorPositionById,
} = require("./logDoors.services");

module.exports = {
  getDoorCurrentStateById: (req, res) => {
    const id = req.params.id;
    getDoorCurrentStateById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          data: "Server Error",
        });
      }
      if (!results) {
        return res.status(204).json({
          success: 0,
          message: "No records found",
        });
      } else if (results.currentState === 1) {
        return res.status(200).json({
          success: 1,
          message: "Open",
        });
      } else {
        return res.status(200).json({
          success: 1,
          message: "Close",
        });
      }
    });
  },

  getDoorPositionById: (req, res) => {
    const id = req.params.id;
    getDoorPositionById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          data: "Server Error",
        });
      }
      if (!results) {
        return res.status(204).json({
          success: 0,
          message: "No records found",
        });
      }
      return res.status(200).json(results);
    });
  },
};
