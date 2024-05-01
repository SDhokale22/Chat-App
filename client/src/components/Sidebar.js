import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice'
import OtherUsers from "./OtherUsers";
import { setMessages } from '../redux/messageSlice'

const Sidebar = () => {
    const [search, setSearch] = useState("");
    const {otherUsers} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutHandler = async() => {
        try{
            const res = await axios.get(`http://localhost:8000/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
            //console.log(res);
        }catch(error){
            console.log(error);
        }
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user)=> user.fullname.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]));
        }else{
            toast.error("User not found!");
        }
    }

  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <form onSubmit={searchSubmitHandler} action='' >
            <label className="input input-bordered flex items-center gap-2">
                <input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="grow" 
                placeholder="Search" 
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 "><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
        </form>
        <div className="divider px-3"></div> 
        <OtherUsers />
        <div className='mt-2'>
            <button onClick={logoutHandler} className='btn btn-sm'>
                Logout
            </button>
        </div>
        
    </div>
  )
}

export default Sidebar;
