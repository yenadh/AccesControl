const { query } = require("express");
const pool = require("../config/database");

const createDoorLog = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO door_log_table (userId, doorId, Time, currentStatus) VALUES (?, ?, ?, ?);",
      [data.userId, data.doorId, data.Time, data.currentStatus],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

const updateDoorCurrentState = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE door_table SET currentState = ? WHERE id = ?",
      [data.currentState, data.id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      }
    );
  });
};

const createAndHandleDoorLog = async (req, res) => {
  const doorLogData = req.body;
  let Time = "";
  const getTime = () => {
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
    Time = formatDateTime.toString();
  };

  console.log(Time);

  const updateDoorStatus = async (doorId, status) => {
    try {
      const updateResponse = await updateDoorCurrentState({
        id: doorId,
        currentState: status,
      });
    } catch (error) {
      console.error("Error updating door status:", error);
    }
  };

  const createLog = async (userId, doorId, Time, status) => {
    try {
      const Log = await createDoorLog({
        userId: userId,
        doorId: doorId,
        Time: Time,
        currentStatus: status,
      });
      console.log("Door Log created");
    } catch (error) {
      console.error("Error Door Log", error);
    }
  };

  try {
    const createOpenTime = async () => {
      getTime();
      await createLog(doorLogData.userId, doorLogData.doorId, Time, 1);
    };

    const createCloseTime = async () => {
      getTime();
      await createLog(doorLogData.userId, doorLogData.doorId, Time, 0);
    };

    const updateDoorStatusOpen = async () => {
      await updateDoorStatus(doorLogData.doorId, 1);
      console.log("Door Table Status Updated to Open");
    };

    const updateDoorStatusClose = async () => {
      await updateDoorStatus(doorLogData.doorId, 0);
      console.log("Door Table Status Updated to Close");
    };

    createOpenTime();
    updateDoorStatusOpen();

    setTimeout(async () => {
      createCloseTime();
      updateDoorStatusClose();
    }, 30000);

    if (res) {
      res.status(200).json({
        success: 1,
        message: "Door log created and status updated successfully",
      });
    }
  } catch (error) {
    console.error("Error handling door log:", error);
    if (res) {
      res.status(500).json({
        success: 0,
        message: "Server Error",
      });
    }
  }
};

module.exports = {
  createAndHandleDoorLog,
};
