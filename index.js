const express = require("express");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes.js");
const messageRoutes = require("./Routes/messagesRoute.js");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000; 
const socket = require("socket.io");
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);
require("./Connections/database_connection.js");

app.get("/", (req, res) => {
  res.send("Hello From Server Side");
});

const server = app.listen(PORT, () => {
  console.log(`Server is running at port no. ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});
