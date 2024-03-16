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

    const [timer, setTimer] = useState(60); // User timer in seconds
    const [want,setWant]=useState(0);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
      const socket = io('http://localhost:4000');
      setSocket(socket); // Set the initialized socket
      return () => {
          socket.disconnect();
      };
  }, []);

    useEffect(() => {
    if (socket) { // Check if socket is initialized
        const handleUpdateRoomPlayers = (count) => {
            setRoomPlayers(count);
        };

        socket.emit('joinRoom', { roomId: inputRoomId } , (response) => {
            if (response.status === 'success') {
                // socket.emit('sendSocket',socket.id);
                console.log(`successfully joined room ${socket.id}`);
            } else {
                console.error(`Error joining room: ${response.message}`);
            }
        });
        socket.on('sendsocket',(e)=>{
          console.log(e);
        })
        socket.on('updateRoomPlayers', handleUpdateRoomPlayers);
        
        return () => {
            socket.off('updateRoomPlayers', handleUpdateRoomPlayers);
            socket.disconnect();
        };
    }
}, [socket, inputRoomId]);
     
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
          console.log({"User":User});
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
    // const handlebid=()={

    // }
    useEffect(() => {
      if(roomPlayers>=3){
      const timerInterval = setInterval(async() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        }else if(want===0){
          console.log("going in want 0");
          handleShowNextImage();
          setWant(0);
          setTimer(20);
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
          setTimer(20);
        }else if(want>=2){
          //handleBid();
          console.log("going in want 2")
        }
      }, 1000);
      return () => clearInterval(timerInterval);}
    }, [timer,want,roomPlayers,currImageIndex]);

    const handleShowNextImage=()=>{
          setCurrentImageIndex((prevIndex) => (prevIndex + 1)%player.length);
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

                      {/* {player.map((ele,index) => (
                      <div key={ele._id} style={{ display: index === currImageIndex ? 'block' : 'none' }}> */}

                     { socket.id!== undefined && (<Card card={player[currImageIndex]} socketId={socket.id} />)}
                       
                    {/* </div>
                    ))} */}
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