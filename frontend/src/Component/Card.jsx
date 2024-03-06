import React from 'react'
import '../CSS/Card.css'
const Card = (props) => {

    const { id, playerName, image, basePrice, creditScore, recentPerformance } = props.card;

  return (
    <div className="card-box">
      <div>
        <img className="playerimage" src={image} alt={playerName}/>
      </div>
      <div>
        <div className="text-justify">
            <span>Name</span>
            <span>{playerName}</span>
        </div>
        <div className="text-justify">
            <span>Base Price</span>
            <span>{basePrice}</span>
        </div>
        <div className="text-justify">
            <span>Credits</span>
            <span>{creditScore}</span>
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
