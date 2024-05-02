import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { timeSince } from '../utils/constant';

const Message = ({message}) => {
  const scroll = useRef();
  const {authUser, selectedUser} = useSelector(store=>store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={message?.senderId === authUser?._id ? authUser?.profilePhoto  : selectedUser?.profilePhoto } />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50 text-gray-700">{`${timeSince(message?.createdAt)}`}</time>
            </div>
            <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : 'bg-gray-800 text-white'} `}>{message?.message}</div>
        </div>

  )
}

export default Message