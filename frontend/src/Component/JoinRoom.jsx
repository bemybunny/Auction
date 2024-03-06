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
    <div className="roomflex">
      <h1>Join Room</h1>
      <input
        type="text"
        value={inputRoomId}
        onChange={(e) => setInputRoomId(e.target.value)}
      />
      <button onClick={handleJoinRoom}><Link to="/join/:inputRoomId">Join Room</Link></button>
    </div>
  );
};

export default JoinRoom;
