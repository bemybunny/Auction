import React, { useState } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
  var socket = io();
  socket.on('connectedRoom',function(data){
    
  })
   return(
    <div>

    </div>
   )
};

export default CreateRoom;
