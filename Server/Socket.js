const { Server } = require('socket.io');

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5174", 
      "http://localhost:5173"],
      methods: ["GET", "POST"],
    },
  });

  const roomLimits = new Map();

  io.on('connection', (socket) => {
    socket.on('joinRoom', ({ roomId }, callback) => {
      const roomPlayerCount = roomLimits.get(roomId) || 0;

      if (roomPlayerCount >= 4) {
        callback({ status: 'error', message: 'No seats available in this room' });
        return;
      }

      socket.join(roomId);
      roomLimits.set(roomId, roomPlayerCount + 1);
      console.log(`User joined room: ${roomId}`);
      callback({ status: 'success' });

      io.to(roomId).emit('updateRoomPlayers', roomLimits.get(roomId));

      socket.on('disconnect', () => {
        roomLimits.set(roomId, Math.max(roomPlayerCount - 1, 0));
        console.log(`User disconnected from room: ${roomId}`);

        // Emit the updated player count to all clients in the room
        io.to(roomId).emit('updateRoomPlayers', roomLimits.get(roomId));
      });
    });
  });

  return io;
};

module.exports = initializeSocket;
