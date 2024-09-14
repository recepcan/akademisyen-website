import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom'
import { setadminMenu, signoutSuccess } from '../../redux/userAuthSlice';
import { toast } from 'react-toastify';
import { AiFillLeftCircle, AiOutlineMenu } from 'react-icons/ai';
import { TiHome } from "react-icons/ti";
import { FcAbout } from "react-icons/fc";
import { MdContentPaste, MdCreateNewFolder } from "react-icons/md";
import { PiPhoneDisconnectThin } from "react-icons/pi";
import { IoCloseSharp, IoDocumentText } from "react-icons/io5";
import { FaPhoneFlip } from 'react-icons/fa6';
import { FaInfoCircle, FaMoon } from 'react-icons/fa';
import { BiSolidSun } from 'react-icons/bi';
import {toggleTheme} from '../../redux/headerEventsSlice'
function SideBar({adminMenu}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.header);
  const [tab, setTab] = useState('');
   const handleSignout = async () => {
    try {
      const res = await fetch('/api/auth/sign-out', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      toast.error(error)
    }
  };
  console.log(tab)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
      // console.log(tabFromUrl)
    }
  }, [location.search]);



  const tabs = [
    {
      title: "home",
      icon: <TiHome />
    },
    {
      title: "about",
      icon: <FaInfoCircle />

    },

    {
      title: "texts",
      icon: <IoDocumentText />
    },
    {
      title: "contact",
      icon: <FaPhoneFlip />
    },

    {
      title: "posts",
      icon: <MdCreateNewFolder />
    }

  ];



  // console.log(currentUser.isAdmin)
  return (
    <div className='w-full min-h-screen md:border-r
         flex  flex-col justify-between bg-[#030620] space-y-5  dark:shadow-none  shadow-lg shadow-gray-400'>


      <div className='flex flex-col  relative pt-14'>
      <div
      onClick={()=>dispatch(setadminMenu())} 
      className=' text-white flex  items-center justify-center rounded-lg text-4xl w-10 h-10 absolute top-2 right-2 '>
      {
        adminMenu  ? 
       <IoCloseSharp />
       :
       <AiOutlineMenu/>
      }
      </div>

        {
          tabs.map((item, index) => (
            <Link key={index} className={`${tab === item.title && 'text-white font-extrabold'} w-full
               rounded-none p-4 space-x-5  shadow-sm   md:hover:bg-[#38445e] text-gray-400
                 flex items-center justify-start  text-xl font-extrabold`}
              to={`/admin?tab=${item.title}`}>
              <div className='text-2xl'>{item.icon}</div>
             { 
              <div className={`${adminMenu? 'visible' : 'hidden'}`}>{item.title}</div>
            }
            </Link>
          ))
        }
        <button
        className='  w-full
               rounded-none p-4 space-x-5     md:hover:bg-[#38445e] text-gray-400
                 flex items-center justify-start text-xl font-extrabold'
        onClick={() => dispatch(toggleTheme())} >
        
        {theme === 'dark'
            ?
            <BiSolidSun className='text-orange-400 text-2xl' />
            :
            <FaMoon className='text-purple-500 text-2xl' />} <h3 className={`${adminMenu? 'visible' : 'hidden'}`}>Theme</h3>
           
    </button>

      </div>

      <div className={`flex ${adminMenu? 'flex-row':'flex-col space-y-3'} items-center justify-between text-white   p-2 shadow-sm shadow-gray-400`}>
        {location.pathname == '/admin' &&
          <button onClick={handleSignout} className='  text-white  bg-red-500  font-semibold p-1 rounded-full'>
            <AiFillLeftCircle className='text-3xl ' />
          </button>
        }
        <Link to={'/'} className='  '>
          <h6 className={`flex ${adminMenu? 'text-md':'hidden'} `}>
          {currentUser.email}
          </h6>
        </Link>
        <img src={currentUser.profilePicture} className='w-8 h-8 object-cover rounded-full ' />
      </div>

    </div>
  )
}
export default SideBar