import React, { useState } from 'react';
import io from 'socket.io-client';

const JoinRoom = ({ match }) => {
  const [inputRoomId, setInputRoomId] = useState(match.params.roomId);
  console.log({"inputroomid":inputRoomId});
  const handleJoinRoom = (e) => {
    e.preventDefault();
    const socket = io('http://localhost:4000'); 
    socket.emit('joinRoom', {roomId:inputRoomId},(response)=>{
      //console.log(response);
    });
    e.target.disabled = true;
  };

  return (
    <div className="roomflex">
      <h1>Join Room</h1>
      <input
        type="text"
        value={inputRoomId}
        onChange={(e) => setInputRoomId(e.target.value)}
      />
      <button onClick={handleJoinRoom}><Link to="/join/:inputRoomId" >Join Room</Link></button>
    </div>
  );
};

export default JoinRoom;
