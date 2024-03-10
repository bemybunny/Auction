const { Server } = require('socket.io');
const User = require('./modals');
const mongoose = require('mongoose');

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
    socket.on('joinRoom', async({ roomId }, callback) => {
      const roomPlayerCount = roomLimits.get(roomId) || 0;
      console.log(`User joined room: ${roomId}`);
      if (roomPlayerCount >= 4) {
        callback({ status: 'error', message: 'No seats available in this room' });
        return;
      }
      socket.join(roomId);
      callback({ status: 'success' });
      const existingUser = await User.findOne({ RoomId: roomId, position: roomPlayerCount });

      if (existingUser) {
        console.log('User with the same id and position already exists:', existingUser);
        // Handle the case where a user with the same id and position already exists
        callback({ status: 'error', message: 'User with the same id and position already exists' });
        return;
      }
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        amount: 100000,
        team: [],
        RoomId: roomId,
        position: roomPlayerCount,
      });
      try {
        const savedUser = await newUser.save();
        console.log('User created and joined room:', savedUser);
          // Emit the user ID to the client socket
          console.log({"savedUser":savedUser._id})
        socket.emit('userSaved', { userId: savedUser._id });

        callback({ status: 'success', message: 'Successfully joined the room' });
    } catch (err) {
        console.error(err);
        callback({ status: 'error', message: 'Error creating user' });
    }
      
      roomLimits.set(roomId, roomPlayerCount + 1);
      io.to(roomId).emit('updateRoomPlayers', roomLimits.get(roomId));

      socket.on('disconnect', async() => {
        roomLimits.set(roomId, Math.max(roomPlayerCount - 1, 0));
        console.log(`User disconnected from room: ${roomId}`);
        try{
          await User.deleteMany({RoomId:roomId});
        }catch(error){
          console.log('error in deleting User');
        }
        // Emit the updated player count to all clients in the room
        io.to(roomId).emit('updateRoomPlayers', roomLimits.get(roomId));
      });
    });
  });

  return io;
};

module.exports = initializeSocket;
