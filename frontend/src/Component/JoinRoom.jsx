import React, { useState } from 'react';
import io from 'socket.io-client';

const JoinRoom = ({ match }) => {
  const [inputRoomId, setInputRoomId] = useState(match.params.roomId);

  const handleJoinRoom = () => {
    const socket = io('http://localhost:4000'); 
    socket.emit('joinRoom', inputRoomId);

    console.log(`Joining room ${inputRoomId}`);
  };

  return (
    <div>
      <h1>Join Room</h1>
      <input
        type="text"
        value={inputRoomId}
        onChange={(e) => setInputRoomId(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

export default JoinRoom;
