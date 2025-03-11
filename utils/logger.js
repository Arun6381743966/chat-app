const fs = require("fs");
const path = require("path");

exports.logActivity = (userId, action) => {
  const log = `[${new Date().toISOString()}] User ${userId}: ${action}\n`;
  fs.appendFileSync(path.join(__dirname, "../logs/activity.log"), log);
};
