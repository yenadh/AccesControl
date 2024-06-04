const pool = require("../../config/database");
const {
  create,
  getLocationById,
  getLocation,
  updateLocation,
  deleteLocation,
  getDoorById
} = require("../location/location.service");

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

  getLocationById: (req, res) => {
    const id = req.params.id;
    getLocationById(id, (err, results) => {
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

  getLocation: (req, res) => {
    getLocation((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json(results);
    });
  },

  updateLocation: (req, res) => {
    const body = req.body;
    updateLocation(body, (err, results) => {
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

  deleteLocation: (req, res) => {
    const id = req.params.id;
    deleteLocation({ id }, (err, results) => {
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

  getDoorById: (req, res) => {
    const id = req.params.id;
    getDoorById(id, (err, results) => {
      if(err){
        console.log(err);
        return;
      }
      if(!results){
        return res.json({
          success:0,
          message:"Records not found"
        })
      }
      return res.json(results)
    })
  }
};
