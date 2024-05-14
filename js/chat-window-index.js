// To run the chat page, you need to install express, socket.io, and uuid &
// must run command in terminal: 'node js/chat-window-index.js'
const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../chat-menu.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    const userRoom = getRoomForUser(socket.id);
    if (userRoom) {
      console.log(`User has sent ${msg} to ${userRoom}`)
      socket.to(userRoom).emit("chat message", msg);
      socket.emit("chat message", msg);
    } else {
      console.error("User not in any room");
    }
  });

  socket.on("create-room", () => {
    const roomId = generateRoomId();
    socket.join(roomId);
    console.log(`User ${socket.id} created room ${roomId}`);
    socket.emit("room-created", roomId);
  });

  const userRooms = {};

  socket.on("join-room", (roomId) => {
    // Add user to room membership
    userRooms[socket.id] = userRooms[socket.id] || [];
    userRooms[socket.id].push(roomId);
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
    socket.emit("joined-room", roomId);
  });

  function getRoomForUser(socketId) {
    if (userRooms[socketId]) {
      return userRooms[socketId][0];
    }
    return null;
  }

  socket.on("disconnect", () => {
    // Remove user from all rooms when they disconnect
    if (userRooms[socket.id]) {
      userRooms[socket.id].forEach((roomId) => {
        socket.leave(roomId);
      });
      delete userRooms[socket.id];
    }
  });

  socket.on("check-user-in-room", (data) => {
    const { roomId, userId } = data;
    const userRooms = userRooms[data] || [];
    const isInRoom = userRooms.includes(roomId);
    socket.emit("user-in-room-response", isInRoom);
  });
});

// Generates a new unique room ID
function generateRoomId() {
  let uniqueRoomId = uuidv4();
  return uniqueRoomId;
}

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
