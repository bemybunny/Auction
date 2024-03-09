import React,{useState,useEffect} from 'react';
import '../CSS/room.css'
import io from 'socket.io-client';
import Card from './Card';
import axios from 'axios'
import { useParams } from 'react-router-dom';


const Room = () => {
  const { inputRoomId } = useParams();

    const [currImageIndex,setCurrentImageIndex]=useState(0);
    const [roomPlayers,setRoomPlayers] = useState(0);
    const [player,SetPlayer] = useState([]);
    const [user,setUser] = useState([]);
 
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
    },[roomPlayers])
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
             
              <div className="roomrow">
              {user.map((userData, index) => (
              <div key={userData._id} className="players">
                User {index + 1} Position: {userData.position}
              </div>
            ))}
                    <div className="cardcenter">
                     { user.map((userData,index)=>{
                        return <div key={index}>
                      {player.map((ele,index) => (
                      <div key={ele._id} style={{ display: index === currImageIndex ? 'block' : 'none' }}>
                        <Card card={ele} userId={userData._id}/>
                    </div>
                    ))}
                        </div>
                      })}
                   
                    <button onClick={handleShowNextImage}>Show Next Image</button>
                    </div>
    
              </div>
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