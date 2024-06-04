const pool = require("../../config/database");
const {
  getDoorCurrentStateById,
  updateDoorCurrentState,
  createDoorLog,log
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

  updateDoorCurrentState: (req, res) => {
    const body = req.body;
    updateDoorCurrentState(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Server Error",
        });
      }
      if (results) {
        return res.status(204).json({
          success: 0,
          message: "No records to Update",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Data Updated Succesfully",
      });
    });
  },

  createDoorLog: (req, res) => {
    const body = req.body;
    createDoorLog(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Record Created",
      });
    });
  },


  //******
  log: (req, res) => {
    const body = req.body;
    log(body, (err, results) => {
      if(err){
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Log Created",
      });
    })
  },

};
