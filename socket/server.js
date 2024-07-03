const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on("connection", (socket) => {
  console.log("Bir kullanici bağlandi!");

  socket.on("message", (message) => {
    console.log(`Mesaj: ${message}`);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Bir kullanici ayrildi!");
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
