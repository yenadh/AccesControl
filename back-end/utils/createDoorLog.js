const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api/logDoors';

const createAndHandleDoorLog = async (doorLogData, isFinalUpdate = false) => {
  try {
    const createLogResponse = await axios.post(`${API_BASE_URL}/`, doorLogData);
    console.log("Door log created:", createLogResponse.data);
    const doorId = doorLogData.doorId;
    await updateDoorStatus(doorId, 1);

    setTimeout(async () => {
      await updateDoorStatus(doorId, 0);      
      if (!isFinalUpdate) {        
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
        const closeTime = formatDateTime.toString(); 
        await createAndHandleDoorLog({
          userId: doorLogData.userId,
          doorId: doorLogData.doorId,
          Time: closeTime,
          currentStatus: 0,
        }, true);
      }
    }, 30000);
  } catch (error) {
    console.error("Error handling door log:", error);
  }
};

const updateDoorStatus = async (doorId, status) => {
  try {
    const updateResponse = await axios.put(`${API_BASE_URL}/`, {
      id: doorId,
      currentState: status,
    });
    console.log('Door status updated:', updateResponse.data);
  } catch (error) {
    console.error('Error updating door status:', error);
  }
};
  

 module.exports = {  
  createAndHandleDoorLog,
};
