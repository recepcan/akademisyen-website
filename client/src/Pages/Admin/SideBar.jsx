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
import { FaImages, FaPhoneFlip, FaPlus } from 'react-icons/fa6';
import { FaInfoCircle, FaMoon, FaSignOutAlt } from 'react-icons/fa';
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
      title:"publications",
      icon:<IoDocumentTextSharp />
    }
    ,
    {
      title: "services",
      icon: <MdHomeRepairService />

    },
    {
      title: "posts",
      icon: <MdCreateNewFolder />
    },
    // {
    //   title: "texts",
    //   icon: <GrTextWrap />

    // },
    {
      title:"galeri",
      icon:<FaImages />

    },
    {
      title: "contact",
      icon: <FaPhoneFlip />
    },

    
   
   

  ];



  // console.log(currentUser.isAdmin)
  return (
    <div className='w-full h-16 px-5   border-y border-gray-500 transition-all duration-300  flex justify-between space-x-2 dark:shadow-none'>

    {/* Navbar Sol Tarafı */}
    <div className='flex space-x-2 items-center relative'>
      {tabs.map((item, index) => (
        <div 
          key={index} 
          className="relative"
        >
          <Link
            className={`${tab === item.title ? 'dark:text-white bg-sky-700 dark:bg-sky-500 text-white font-extrabold' : ''}
              h-12 border border-gray-500 rounded-lg p-2 space-x-2 shadow-sm md:hover:bg-sky-900 md:hover:text-white
              flex items-center justify-start text-lg font-extrabold`}
            to={item.to? `/${item.to}` : `/panel?tab=${item.title}`}
          >
            <div className={`text-xl `}>{item.icon}</div>
            <h1 className={`max-lg:hidden text-sm`}>{item.title}</h1>
          </Link>

          {/* Dropdown Menü */}
          {item.submenu && openDropdown === item.title && (
            <div className="absolute left-0 max-sm:hidden top-full  z-40 bg-white dark:bg-gray-800 border rounded-lg shadow-lg w-48">
              {item.submenu.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  to={subItem.link}
                  className="block px-4 py-3 rounded-lg text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Navbar Sağ Tarafı */}
    <div className="flex-1 flex flex-row justify-end space-x-2 items-center    p-2">
    
  
    {location.pathname === '/panel' &&
        <button 
        onClick={handleSignout} 
        className='hover:bg-red-600 h-12 border font-semibold p-2 rounded-lg border-gray-500'>
          <FaSignOutAlt />
        </button>
      }
      
    </div>

  </div>
  )
}
export default SideBar