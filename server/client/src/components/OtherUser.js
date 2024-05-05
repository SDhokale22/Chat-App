import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({user}) => {
    const dispatch = useDispatch();
    const {selectedUser, onlineUsers} = useSelector(store=>store.user);
    const isOnline = onlineUsers?.includes(user._id);

    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }

  return (
    <>
    <div onClick={() => selectedUserHandler(user)} className={`${selectedUser?._id === user?._id ? "hover:bg-zinc-200" : ""} flex gap-2 items-center hover:bg-zinc-200 rounded-sm cursor-pointer p-2`}>
        <div className={`avatar ${isOnline ? 'online' : '' }`}>
            <div className='w-12 rounded-full'>
                <img src={user?.profilePhoto} alt='' />
            </div>
        </div>
        <div className='flex flex-col flex-1 '>
            <div className='flex gap-2 justify-between'>
                <p>{user?.fullname}</p>
            </div>
        </div>
    </div>  
    <div className='divider my-0 py-0 h-1'></div>   
</>
  )
}

export default OtherUser;