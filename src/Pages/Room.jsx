import React, { useEffect,useCallback } from 'react'
import { useSocket } from '../Providers/Socket'
import { usePeer } from '../Providers/Peer';

const Room = () => {
    const socket = useSocket();
    const {peer,createOffer,createAnswer,setRemoteAns} = usePeer();
    const handleNewUserJoined =useCallback(async (data)=>{
        console.log('a New user Joined room',data);
        const {emailId} = data;
        const offer = await createOffer();
        console.log(offer)
        socket.emit('call-user',{emailId,offer})
    },[createOffer,socket]);

    const handleIncommngCall = useCallback(async(data)=>{
      const {from,offer} = data;
      console.log('Incoming Call',data);
      const ans = await createAnswer(offer);
      console.log('Incoming Call from ', from ,offer)
      socket.emit('call-accepted',{emailId:from,ans});
    },[createAnswer,socket]);
    const handleCallAccepted = useCallback(async(data)=>{
      const {ans} = data;
      await setRemoteAns(ans);
      console.log('call got accepted');
    },[setRemoteAns])
     useEffect(()=>{
        socket.on('user-joined',handleNewUserJoined);
        socket.on('incoming-call',handleIncommngCall);
        socket.on('call-accepted',handleCallAccepted);

        return ()=>{
          socket.off('user-joined',handleNewUserJoined);
          socket.off('incoming-call',handleIncommngCall);
          socket.off('call-accepted',handleCallAccepted);
        }
     },[socket,handleNewUserJoined,handleIncommngCall,handleCallAccepted])
  return (
    <div>This is room page..</div>
  )
}

export default Room