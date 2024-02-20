import React, { useState} from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid'; // Use 'v4 as uuidv4' for clarity
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/selectroom.css';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:4000');

const SelectRoom = () => {
  // const [socket, setSocket] = useState(null);
  const [join, setJoin] = useState(false);
  const [create, setCreate] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [userid, setUserid] = useState('');
  const navigate = useNavigate();

  const toastoption = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    const newRoomId = uuidv4();
    setRoomId(newRoomId);
    setJoin(false);
    setCreate(true);
    
  };

  const handleJoinRoom = () => {
    setJoin(true);
  };
  const handleEnter=()=>{
    if (roomId) {
      socket.emit('joinRoom', {roomId: roomId },(response)=>{
        if(response.status==='success'){
          navigate(`/join/${roomId}`);
        }else {
          toast.error(response.message,toastoption);
        }
      });
    } else {
      toast.error('Invalid Room ID', toastoption);
    }
  }
  const handleSubmit = () => {
    if (userid) {
      socket.emit('joinRoom', {roomId: userid},(response)=>{
        if(response.status==='success'){
          navigate(`/join/${userid}`);
        }else {
          toast.error(response.message,toastoption);
        }
      })
      setUserid('');
    } else {
      toast.error('Invalid Link', toastoption);
      setUserid('');
    }
  };

  return (
    <div className="selectroom">
      <div>
        <div className="selectroom1" onClick={handleCreateRoom}>
          Create Room
        </div>
        {create && (
          <div>
            <span>{roomId}</span>
            <button onClick={handleEnter}>Enter</button>
          </div>
        )}
      </div>
      <div>
        <div className="selectroom2" onClick={handleJoinRoom}>
          Join Room
        </div>
        {join && (
          <div>
            <input
              value={userid}
              placeholder="Enter the join link"
              onChange={(e) => setUserid(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectRoom;
