import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom'
import { setadminMenu, signoutSuccess } from '../../redux/userAuthSlice';
import { toast } from 'react-toastify';
import { AiFillLeftCircle, AiOutlineMenu } from 'react-icons/ai';
import { TiHome } from "react-icons/ti";
import { FcAbout } from "react-icons/fc";
import { MdContentPaste, MdCreateNewFolder, MdHomeRepairService } from "react-icons/md";
import { PiPhoneDisconnectThin } from "react-icons/pi";
import { IoCloseSharp, IoDocumentText, IoDocumentTextSharp } from "react-icons/io5";
import { FaPhoneFlip } from 'react-icons/fa6';
import { FaInfoCircle, FaMoon } from 'react-icons/fa';
import { BiSolidSun } from 'react-icons/bi';
import {toggleTheme} from '../../redux/headerEventsSlice'
import { BsPersonCircle } from "react-icons/bs";
import { GrTextWrap } from "react-icons/gr";

function SideBar({adminMenu}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.header);
  const [tab, setTab] = useState('home');
  
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
      title: "services",
      icon: <MdHomeRepairService />

    },
    {
      title: "texts",
      icon: <GrTextWrap />

    },
    {
      title: "contact",
      icon: <FaPhoneFlip />
    },

    {
      title: "posts",
      icon: <MdCreateNewFolder />
    },
    {
      title:"publications",
      icon:<IoDocumentTextSharp />
    }
    ,
    {
      title:"profile",
      icon:<BsPersonCircle />
    },

  ];



  // console.log(currentUser.isAdmin)
  return (
    <div className='w-full min-h-screen md:border-r-2 border-[#374151]
         flex  flex-col justify-between bg-transparent   space-y-5  dark:shadow-none  shadow-lg shadow-gray-400'>


      <div className='flex flex-col  relative pt-14'>
      <div
      onClick={()=>dispatch(setadminMenu())} 
      className='   cursor-pointer flex  items-center justify-center rounded-lg text-4xl w-10 h-10 absolute top-2 right-2 '>
      {
        adminMenu  ? 
       <IoCloseSharp />
       :
       <AiOutlineMenu/>
      }
      </div>

        {
          tabs.map((item, index) => (
            <Link
             key={index} 
             className={`${tab === item.title && 'dark:text-white  bg-sky-700 dark:bg-sky-500 text-white  font-extrabold'} w-full
               rounded-none p-4 space-x-5  shadow-sm   md:hover:bg-sky-900 md:hover:text-white text-gray-900 dark:text-gray-400
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
               rounded-none p-4 space-x-5     md:hover:bg-sky-900 md:hover:text-white text-gray-900 dark:text-gray-400
                 flex items-center justify-start text-xl font-extrabold'
        onClick={() => dispatch(toggleTheme())} >
        
        {theme === 'dark'
            ?
            <BiSolidSun className='text-orange-400 text-2xl' />
            :
            <FaMoon className='text-purple-500 text-2xl' />} <h3 className={`${adminMenu? 'visible' : 'hidden'}`}>Theme</h3>
           
    </button>

      </div>

      <div className={`flex ${adminMenu? 'flex-row':'flex-col space-y-3'} items-center justify-between text-gray-900 dark:text-gray-400   p-2 `}>
        {location.pathname == '/admin' &&
          <button onClick={handleSignout} className='  text-white  bg-red-500  font-semibold p-1 rounded-full'>
            <AiFillLeftCircle className='text-3xl ' />
          </button>
        }
        <Link to={'/'} className='  '>
          <h6 className={`flex ${adminMenu? 'text-md':'hidden'} `}>
          {currentUser?.email}
          </h6>
        </Link>
      {/* <Link  to={`/admin?tab=profile`}>
       <img src={currentUser?.profilePicture} className='w-8 h-8 object-cover rounded-full ' />
       </Link> */}
      </div>

    </div>
  )
}
export default SideBar