import React,{useState,useEffect} from 'react'
import axios from 'axios';
import cross from '../assets/cart_cross_icon.png'
import '../CSS/listproduct.css'

const ListProduct = () => {
const [player,SetPlayer] = useState([]);
useEffect(()=>{
  const fetchData = async()=>{
    try{
      const response = await axios.get('http://localhost:4000/listProduct')
      console.log(response);
      SetPlayer(response.data);
    }catch(err){
      console.log(err);
    }
  }
  fetchData();
},[handleDelete])


const handleDelete=async(id)=>{
  console.log(id);
  try{
    const response = await axios.delete(`http://localhost:4000/deletePlayer/${id}`)
    SetPlayer(prevPlayers => prevPlayers.filter(player => player._id !== id));
  }catch(err){
    console.log(err);
  }
}

  return (
    <div className="listproduct">
       {
        player.map((ele)=>{
          return (
            <div key={ele._id} >
              <div className="playerow" >
              <img className="playerimage" src={ele.image} />
              <span>{ele.name}</span>
              <span>{ele.basePrice}</span>
              <span>{ele.credit}</span>
              <img className="playercross" src={cross} onClick={() => handleDelete(ele._id)} />
              </div>
             <hr/>
          </div>
          
          )
        })
       }
    </div>
  )
}

export default ListProduct
