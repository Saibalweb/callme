import React, { useCallback, useEffect } from 'react'
import { useSocket } from '../Providers/Socket';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const socket = useSocket();
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [roomId, setRoomId] = React.useState("");
    const handleRoomJoin = ()=>{
        if(!email || !roomId){
            alert("Please enter all the fields");
            return;
        }
        socket.emit("join-room", {roomId, emailId: email});
    }
    const handleRoomJoined = useCallback((room)=>{
        navigate(`/room/${room.roomId}`);
    },[navigate])
    useEffect(()=>{
      socket.on('joined-room',handleRoomJoined);
      return ()=>{
        socket.off('joined-room',handleRoomJoined)
      }
    },[socket,handleRoomJoined])
  return (
    <div className='homepage-containter'>
        <div className='input-container'>
            <input type="email" placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" placeholder='Enter your Room-Code' value={roomId} onChange={(e)=>setRoomId(e.target.value)} />
            <button className='btn' onClick={handleRoomJoin}>Enter Room</button>
        </div>
    </div>
  )
}

export default Home