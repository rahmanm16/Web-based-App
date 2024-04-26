const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

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
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

// io.on("connection", (socket) => {
//     socket.on("set nickname", (nickname) => {
//         console.log("User", socket.id, "set nickname to", nickname);
//         socket.broadcast.emit("set nickname", nickname);
//     })
// })

server.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
