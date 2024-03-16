import React,{useState,useEffect} from 'react'
import '../CSS/Card.css'
import axios from 'axios';
// import img from  '../assets/react.svg'
const Card = (props) => {

   const [count,setCount]=useState(false);
    const { name, image, basePrice, credit, recentPerformance,index } = props.card;
    const socketId=props.socketId;
    console.log({"socketId":socketId});
    const handlecount = async(e)=>{
      e.preventDefault();
      setCount(!count)
    }
    useEffect(()=>{
      if (socketId === undefined) {
        return;
      }
      const fetchData=async()=>{
        try{
          const response = await axios.put('http://localhost:4000/updateTeam',{
            count: count, 
            index: index,
            socketId: socketId
          });
          console.log({"response":response.data});
        }
        catch(error){
          console.log(error);
        }
      }
     fetchData();
    },[count])

  return (
    <div className="card-box">
      <div>
        <img className="playerimage" src={image} alt={name}/>
      </div>
      <div>
        <div className="text-justify">
            <span>Name</span>
            <span>{name}</span>
        </div>
        <div className="text-justify">
            <span>Base Price</span>
            <span>{basePrice}</span>
        </div>
        <div className="text-justify">
            <span>Credits</span>
            <span>{credit}</span>
        </div>
        <div className="text-justify">
            <span>Recent Performance</span>
            <span>{recentPerformance}</span>
        </div>
        <div className="text-justify">
          <button className={count==0?'wantbtn':'wantbtngreen'} onClick={handlecount}>Want</button>
        </div>
      </div>
    </div>
  )
}

export default Card;