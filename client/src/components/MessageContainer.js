import React, { useEffect } from 'react'
import SendInput from './SendInput';
import Messages from './Messages';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const MessageContainer = () => {

  const {selectedUser, authUser, onlineUsers} = useSelector(store=>store.user);
  const dispatch = useDispatch();

  const isOnline = onlineUsers?.includes(selectedUser?._id);
/*
  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, [])
  */

  return (
    <>
      {
        selectedUser !== null ? (
          <div className='md:min-w-[550px] flex flex-col'>
        <div className='flex gap-2 items-center text-white bg-zinc-800 px-4 py-2 mb-2'>
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
            <div className='w-12 rounded-full'>
                <img src={selectedUser?.profilePhoto} alt='' />
            </div>
        </div>
        <div className='flex flex-col flex-1 '>
            <div className='flex gap-2 justify-betwwen'>
                <p>{selectedUser?.fullname}</p>
            </div>
        </div>
    </div> 
    <Messages />
    <SendInput /> 
    </div>
        ) : (
          <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-bold'>Hi, {authUser?.fullname}</h1>
            <h1 className='text-2xl'>Let's start conversation</h1>
          </div>
         
        )
      }
    </>
  )
}

export default MessageContainer