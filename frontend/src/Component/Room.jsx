import React,{useState,useEffect} from 'react';
import card from '../cards';
import '../CSS/room.css'
import io from 'socket.io-client';
import Card from './Card';

const Room = () => {
    const [currImageIndex,setCurrentImageIndex]=useState(1);
    const [roomPlayers,setRoomPlayers] = useState(0);

    useEffect(()=>{
        const socket = io('http://localhost:4000'); 
        socket.emit('joinRoom',{roomId:'yourRoomId'},(response)=>{
            if(response.status==='success'){
                console.log('successfully joined room');
            }else{
                console.error(`Error joining room: ${response.message}`);
            }
        })
        socket.on('updateRoomPlayers', (count) => {
            setRoomPlayers(count);
          });
      
          return () => {
            socket.disconnect();
          };
    }, []);
    const handleShowNextImage=()=>{
        if(currImageIndex==card.length){
          setCurrentImageIndex(1);
        }
        if(currImageIndex<card.length){
            setCurrentImageIndex(currImageIndex+1);
        }
    }

    return (
        <div >
          {roomPlayers === 1 ? (
            <div className="roomcol">
              <div className="players">{roomPlayers}</div>
              <div className="roomrow">
                    <div className="players">{roomPlayers}</div>
                    <div className="cardcenter">
                    {card.map((ele) => (
                    <div key={ele.id} style={{ display: ele.id === currImageIndex ? 'block' : 'none' }}>
                        <Card card={ele}/>
                    </div>
                    ))}
                    <button onClick={handleShowNextImage}>Show Next Image</button>
                    </div>
                    <div className="players">{roomPlayers}</div>
              </div>
              <div className="players">{roomPlayers}</div>
            </div>
          ) : (
            <div>
              <p>Waiting for players to join...</p>
            </div>
          )}
        </div>
      );
};

export default Room;