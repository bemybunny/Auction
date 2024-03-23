import React,{useState,useEffect} from 'react'
import '../CSS/Card.css'
import axios from 'axios';
// import img from  '../assets/react.svg'
const Card = (props) => {
   //console.log(props);
   const [count,setCount]=useState(false);
    const { name, image, basePrice, credit, recentPerformance,index } = props.card;
    const userId=props.userId;
    // console.log({"userId":userId});
    // console.log({"index":index});
    const handlecount = async()=>{
     // console.log(count);
      setCount(!count)
     
    }
    useEffect(()=>{
      //console.log("count Changed",count);
      if (userId === null) {
        return;
      }
      const fetchData=async()=>{
        try{
          const response = await axios.post('http://localhost:4000/updateTeam',{
            count: count, 
            index: index,
            userId: userId
          });
          //console.log(response.data);
        }
        catch(error){
          console.log(error);
        }
      }
     fetchData();
    },[count,userId])

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

export default Card
