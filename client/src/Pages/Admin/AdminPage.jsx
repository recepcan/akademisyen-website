import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signInFailure, signInSuccess, signoutSuccess } from '../../redux/userAuthSlice';
import { toast } from 'react-toastify';
// import AdminHomeComponent from './AdminHomeComponent';
// import AdminAboutComponent from './AdminAboutComponent';
// import AdminContactComponent from './AdminContactComponent';
import AdminPostsComponent from './AdminPostsComponent';
// import AdminUpdatePostComponent from './UpdatePost';
import AdminTextsComponent from './AdminTextsComponent';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import SideBar from './SideBar';
import {Button} from 'flowbite-react'
import Profile from './Profile';
import AdminPublicationsComponent from './AdminPublicationsComponent';
import AdminServicesCompopnent from './AdminServicesComponent';
import AdminGaleriComponent from './AdminGaleriComponent';
import AdminHomeComponent from './AdminHomeComponent';
import AdminContactComponent from './AdminContactComponent';
import AdminAboutComponent from './AdminAboutComponent';
import Dialog from '../../Components/Dialog';



function AdminPage() {
    // const [adminMenu, setadminMenu] = useState(false)
    
    
    
    
      const location = useLocation();
      const dispatch = useDispatch();
      const { currentUser,adminMenu } = useSelector((state) => state.user);
      const [tab, setTab] = useState('home');
    
      useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
          setTab(tabFromUrl);
          // console.log(tabFromUrl)
        }
      }, [location.search]);
    
      return (
        <div className='border-lime-500 flex-1 flex-col overflow-auto  items-center '>
         
    
        {
         
          <div 
          className={`${adminMenu? '' : ' '} w-full h-16  transition-all duration-200   border-gray-800 `}>
          <SideBar adminMenu={adminMenu} />
          </div>
        }
    
    
          <div className={` w-full flex flex-col 
             box-border p-2 max-h-screen    border-black`} >
          
          <div 
          className='w-full  uppercase flex items-center justify-around  p-3 text-2xl  
           rounded-sm mb-5 '>
          <h1>Edit {tab} Page</h1>

          {
            tab==="posts" && 
            <Link to={'/create-post'} className=' flex flex-col'>
            <Button 
            gradientDuoTone="purpleToBlue" outline
            className='md:w-72 w-full  font-extrabold   '>
              Create Post
            </Button>
          </Link>
          }
          {
            tab==="publications" && 
            <Link to={'/create-publication'} className=' flex flex-col'>
            <Button 
            gradientDuoTone="purpleToBlue" outline
            className='md:w-72 w-full  font-extrabold   '>
              Create Publications
            </Button>
          </Link>
          }
          {
            tab==="texts" && 
            <Link to={'/create-text'} className=' flex flex-col'>
            <Button 
            gradientDuoTone="purpleToBlue" outline
            className='md:w-72 w-full  font-extrabold   '>
              Create Text
            </Button>
          </Link>
          }
          {
            tab==="services" && 
            <Link to={'/add-service'} className=' flex flex-col'>
            <Button 
            gradientDuoTone="purpleToBlue" outline
            className='md:w-72 w-full  font-extrabold   '>
              Add Service
            </Button>
          </Link>
          }
          {
            tab==="galeri" && 
            <Link to={'/add-image'} className=' flex flex-col'>
            <Button 
            gradientDuoTone="purpleToBlue" outline
            className='md:w-72 w-full  font-extrabold   '>
              Add image
            </Button>
          </Link>
          }

          </div>
      <div className='w-full min-h-screen  border-red-600'>
      
      {tab==='about' && (<AdminAboutComponent/>) } 
      {tab==='contact' &&  (<AdminContactComponent/>)} 
      {tab==='home' &&  (<AdminHomeComponent/>)}
      {tab==='' &&  (<AdminHomeComponent/>)} 
      {tab==='services' &&  (<AdminServicesCompopnent/>)} 
     {tab==='posts' &&  (<AdminPostsComponent />)} 
     {tab===`texts` &&  (<AdminTextsComponent />)} 
     {tab===`profile` &&  (<Profile />)} 
     {tab===`publications` &&  (<AdminPublicationsComponent />)} 
     {tab===`galeri` &&  (<AdminGaleriComponent />)} 
     {tab===`dialog` &&  (<Dialog />)} 
      
      </div>
          </div>
        </div>
      )
    }
    
    export default AdminPage