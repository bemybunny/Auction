import React,{useState,useEffect} from 'react';
import '../CSS/room.css'
import io from 'socket.io-client';
import Card from './Card';
import axios from 'axios'
import { useParams } from 'react-router-dom';


const Room = () => {
  const { inputRoomId } = useParams();
  //console.log(inputRoomId);

    const [currImageIndex,setCurrentImageIndex]=useState(0);
    const [roomPlayers,setRoomPlayers] = useState(0);
    const [player,SetPlayer] = useState([]);
    const [user,setUser] = useState([]);
    useEffect(()=>{
      const fetchData=async()=>{
        try{
          const User = await axios.get(`http://localhost:4000/getUser/${inputRoomId}`)
          console.log({"User":User});
          setUser(User.data);
        }catch(error){
          console.log(error);
        }
      }
      fetchData();
    },[])
    useEffect(()=>{
      const fetchData = async()=>{
        try{
          const response = await axios.get('http://localhost:4000/listProduct')
          // console.log(response);
          SetPlayer(response.data);
        }catch(err){
          console.log(err);
        }
      }
      fetchData();
    },[])
    useEffect(()=>{
        const socket = io('http://localhost:4000'); 
        socket.emit('joinRoom',{roomId:inputRoomId},(response)=>{
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
        if(currImageIndex==player.length){
          setCurrentImageIndex(0);
        }
        if(currImageIndex<player.length){
            setCurrentImageIndex(currImageIndex+1);
        }
    }

    return (
        <div >
          {roomPlayers >= 1 ? (
            <div className="roomcol">
              <div className="players">{roomPlayers}</div>
              <div className="roomrow">
                    <div className="players">{roomPlayers}</div>
                    <div className="cardcenter">
                    {player.map((ele,index) => (
                    <div key={ele._id} style={{ display: index === currImageIndex ? 'block' : 'none' }}>
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