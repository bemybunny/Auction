const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const roomLimits = new Map();

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ roomId }, callback) => {
    const roomPlayerCount = roomLimits.get(roomId) || 0;

    if (roomPlayerCount >= 2) {
      callback({ status: 'error', message: 'No seats available in this room' });
      return;
    }

    socket.join(roomId);
    roomLimits.set(roomId, roomPlayerCount + 1);
    console.log(`User joined room: ${roomId}`);
    callback({ status: 'success' });

    socket.on('disconnect', () => {
      roomLimits.set(roomId, Math.max(roomPlayerCount - 1, 0));
      console.log(`User disconnected from room: ${roomId}`);
    });
  });
});

server.listen(4000, () => {
  console.log('Server is running at 4000');
});
