const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { logActivity } = require("./utils/logger");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", async ({ userId, message }) => {
    io.emit("receiveMessage", { userId, message });
    logActivity(userId, "Message Sent");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
sequelize
  .sync()
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
