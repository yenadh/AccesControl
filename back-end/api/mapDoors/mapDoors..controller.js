const pool = require("../../config/database");
const {
  getDoorMapById,
  getMapDoor,
  deleteMapDoor,
  create,
} = require("../mapDoors/mapDoors.service");

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

  getDoorMapById: (req, res) => {
    const id = req.params.id;
    getDoorMapById(id, (err, results) => {
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

  getMapDoor: (req, res) => {
    getMapDoor((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json(results);
    });
  },

  deleteMapDoor: (req, res) => {
    const { userId, doorId } = req.body;

    if (!userId || !doorId) {
      return res
        .status(400)
        .json({ error: "User ID and Door ID are required" });
    }

    deleteMapDoor(userId, doorId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Mapping not found" });
      }
      return res.json({ message: "Mapping deleted successfully" });
    });
  },
};
