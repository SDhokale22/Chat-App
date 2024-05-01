import axios from 'axios';
import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const SendInput = () => {

  const [message, setMessage] = useState("");
  const dispatch = useDispatch(); 
  const {selectedUser} = useSelector(store=>store.user);
  const {messages} = useSelector(store=>store.message);

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try{
      const res = await axios.post(`http://localhost:8000/api/v1/message/send/${selectedUser?._id}`, {message}, {
        headers:{
          "Content-Type" : "application/json"
        },
        withCredentials: true
      });
     
      dispatch(setMessages([...messages, res?.data?.newMessage]))

    }catch(error){
      console.log(error);
    }
    setMessage("");
  }

  return (
    <form onSubmit={onSubmitHandler} className='px-4 my-3'>
         <div className='w-full relative'>
            <input 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type='text' 
            placeholder='Send Message' 
            className='border text-sm rounded-lg block w-full border-zinc-300 bg-gray-500 text-white p-2'
            />
            <button type='submit' className='absolute flex items-center inset-y-0 end-0 pr-4'>
                <IoSend />
            </button>
        </div>
    </form>
   
  )
}

export default SendInput