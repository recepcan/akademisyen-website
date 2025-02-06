import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {  toggleMenu, toggleTheme } from '../redux/headerEventsSlice'
import { FaFlagCheckered, FaInfoCircle, FaMoon } from 'react-icons/fa'
// import { Links } from '../store/Links.js'
import { IoCloseSharp } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { BiSolidSun } from 'react-icons/bi'
import { FaPhoneFlip } from 'react-icons/fa6'
import { GoHomeFill } from 'react-icons/go'
import { MdManageAccounts, MdOutlineManageAccounts } from 'react-icons/md'
function ToggleMenu() {
    const { menu, language, theme } = useSelector(state => state.header)
    const dispatch = useDispatch()

    const Links = [
        {
            id: 'Anasayfa',
            name: 'Anasayfa',
            to: '/',
            icon: null
        },
        {
            id: 'hakkinda',
            name: 'Hakkında',
            to: '/hakkinda',
            index: true,
            icon: null
        },
        {
            id: 'akademik',
            name: 'Akademik',
            to: '/akademik',
            index: true,
            icon:null
        },
        {
            id: 'calismaAlanlari',
            name: 'Çalışma Alanları',
            to: '/calisma-alanlari',
            index: true,
            icon: null
        },
        {
            id: 'blog',
            name: 'Blog',
            to: '/blog',
            index: true,
            icon: null
        },
        {
            id: 'galeri',
            name: 'Galeri',
            to: '/galeri',
            index: true,
            icon: null
        },
        
        {
            id: 'iletisim',
            name: 'İletişim',
            to: '/iletisim',
            icon: null


        },
        {
            id: 'panel',
            name: 'panel',
            to: '/panel',
            icon: null


        }

    ]
    return (

        <motion.div
            initial={{ top: -400 }}
            animate={{ top: 0 }}
            exit={{ top: -400 }}
            transition={{ duration: .3 }}
            className='absolute w-full  bg-white dark:bg-[#030620] z-50 overflow-none p-5 pt-20
         dark:text-white transition-colors duration-300 min-h-screen text-white
          left-0  top-0 bottom-0 right-0 flex flex-col gap-2 items-center justify-start'>
            <div className='w-10 h-10 absolute right-5 top-5    rounded-full text-4xl text-black dark:text-white font-semibold
           flex items-center justify-center'
                onClick={() => dispatch(toggleMenu())}>
                <IoCloseSharp />
            </div>
            {
                Links?.map((item, index) => (

                    <NavLink key={index} to={item.to} className=' text-slate-950  dark:text-white p-5 border w-full  rounded-lg  
                         flex text-center items-center justify-center '
                        onClick={() => dispatch(toggleMenu())}>
                        <div className='flex items-center justify-center   space-x-3'>
                        <h1>
                            {
                                item.icon
                            }</h1>
                        <h1>{
                            item.name
                        }</h1>
                        </div>



                    </NavLink>


                ))}
            <button
                className=' pl-5   text-slate-950  dark:text-white p-5 border w-full  rounded-lg  
                         flex text-center items-center justify-center '
                onClick={() => dispatch(toggleTheme())} >

                <div className='flex items-center justify-center   space-x-3'>
                {theme === 'dark'
                    ?
                    <BiSolidSun className='text-orange-400 text-2xl' />
                    :
                    <FaMoon className='text-purple-700 text-xl' />}
                <h1>Theme</h1>
                </div>
            </button>

        </motion.div>


    )
}

export default ToggleMenu