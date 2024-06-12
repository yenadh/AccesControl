const express = require("express");
const mysql = require("mysql2");
const WebSocket = require("ws");

const app = express();
const port = 4000;

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "doorsystem",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("New client connected");

  // Send initial state
  db.query(
    "SELECT id,doorName,currentState FROM door_table",
    (err, results) => {
      if (err) {
        console.error(err);
        return;
      }
      ws.send(JSON.stringify(results));
    }
  );

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Function to check for state changes
const checkForStateChanges = () => {
  db.query("SELECT * FROM state_changes", (err, results) => {
    if (err) {
      console.error(err);
      return;
    }

    if (results.length > 0) {
      results.forEach((change) => {
        // Fetch the updated door state
        db.query(
          "SELECT id,doorName,currentState FROM door_table WHERE id = ?",
          [change.doorId],
          (err, doorResults) => {
            if (err) {
              console.error(err);
              return;
            }

            // Broadcast the updated state to all connected clients
            wss.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(doorResults));
              }
            });
          }
        );
      });

      // Clear the state_changes table after processing
      db.query("DELETE FROM state_changes", (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  });
};

// Polling interval to check for state changes (e.g., every second)
setInterval(checkForStateChanges, 1000);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
