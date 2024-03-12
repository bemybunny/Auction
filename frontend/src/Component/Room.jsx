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
    const [userId,setUserId]=useState(null);
    const [timer, setTimer] = useState(10); // User timer in seconds
    const [want,setWant]=useState(0);
    const socket = io('http://localhost:4000'); 
    useEffect(()=>{
        socket.emit('joinRoom',{roomId:inputRoomId},(response)=>{
            if(response.status==='success'){
                console.log('successfully joined room');
            }else{
                console.error(`Error joining room: ${response.message}`);
            }
        })
        socket.on('userSaved', ({ userId, isNewUser }) => {
          if (isNewUser) {
              console.log(`New user joined. User Id saved: ${userId}`);
              setUserId(userId);
          }
      });
        socket.on('updateRoomPlayers', (count) => {
            setRoomPlayers(count);
          });
      
          return () => {
            socket.disconnect();
          };
    }, []);
     
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
      const fetchData=async()=>{
        try{
          const User = await axios.get(`http://localhost:4000/getUser/${inputRoomId}`)
          //console.log({"User":User});
          setUser(User.data);
          if(timer==0){
          for (let i = 0; i < User.data.length; i++) {
            if (User.data[i].team[currImageIndex] === true) {
              setWant(want + 1);
            }
          }
         console.log({"want":want});}
        }catch(error){
          console.log(error);
        }
      }
      fetchData();
    },[timer,currImageIndex,roomPlayers])

    useEffect(() => {
      if(roomPlayers>=1){
      const timerInterval = setInterval(async() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        }else if(want===0){
          console.log("going in want 0");
          handleShowNextImage();
          setWant(0);
          setTimer(10);
        }else if(want===1){
          console.log("going in want 1");
          try{
            const response = await axios.put(`http://localhost:4000/updateAmount/${inputRoomId}`,{
              basePrice: player[currImageIndex].basePrice,
              currImageIndex
            })
            console.log(response.data);
          }catch(error){
            console.log(error);
          }
          
          handleShowNextImage();
          setWant(0);
          setTimer(10);
        }
      }, 1000);
      return () => clearInterval(timerInterval);}
    }, [want,roomPlayers,currImageIndex]);

    const handleShowNextImage=()=>{
        if(currImageIndex===player.length){
          setCurrentImageIndex(0);
        }
        if(currImageIndex<player.length){
          setCurrentImageIndex((prevIndex) => prevIndex + 1);
            setTimer(10);
        }
    }

    return (
        <div >
          {roomPlayers >= 1 ? (
            <div className="roomcol">
             
              <div className="roomrow">
              {
                user.map((userData, index) => (
                  <div
                    key={userData._id}
                    className="players"
                    style={{
                      position: 'absolute',
                      top: index === 0 ? 0 : 'auto',
                      right: index === 1 ? 0 : 'auto',
                      bottom: index === 2 ? 0 : 'auto',
                      left: index === 3 ? 0 : 'auto',
                    }}
                  >
                     
                    <span>User {index + 1} </span> 
                    <span>amount:{userData.amount} </span>
                    <span>Position: {userData.position} </span>
                    <span> timer={timer} </span>
                   
                  </div>
                ))
              }
                    <div className="cardcenter">

                      {player.map((ele,index) => (
                      <div key={ele._id} style={{ display: index === currImageIndex ? 'block' : 'none' }}>

                     { userId!==null && (<Card card={ele} userId={userId} />)}
                       
                    </div>
                    ))}
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