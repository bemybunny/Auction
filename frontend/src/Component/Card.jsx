import React from 'react'
import '../CSS/Card.css'
// import img from  '../assets/react.svg'
const Card = (props) => {
   // console.log(props);
    const { name, image, basePrice, credit, recentPerformance } = props.card;
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
      </div>
    </div>
  )
}

export default Card
