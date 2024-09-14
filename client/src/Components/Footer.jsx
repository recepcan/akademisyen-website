import React from 'react'
import { FaReact, FaInstagram, FaLinkedin, FaWhatsapp, FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div className='w-full   bg-white bottom-0 dark:shadow-none 
         border-blue-500  text-black flex flex-col  max-lg:space-y-8  justify-center text-center items-center
        dark:text-white dark:bg-black transition-colors duration-300 dark:z-50 flex-1'>
      <div className='flex items-center justify-center flex-col w-full space-y-5  bg-transparent bg-gradient-to-b from-sky-100 to-white dark:from-[#030620] dark:to-black'>
        <Link to="/">
          <div className='flex items-center justify-center'>
            <h1 className='bg-gradient-to-br from-blue-300 via-blue-500 to-purple-500  text-white p-2 rounded-2xl text-xl md:text-3xl font-bold font-sans'>
              Yunus Altundağ
            </h1>
          </div>
        </Link>
        <h2> Copyright©2024 Yunus Altundag. All rights reserved.</h2>
        <hr className='w-[90%] border-black  dark:border-sky-400 ' />
      </div>

      <div className='w-full flex flex-col md:flex-row items-center justify-center p-4'>

        <div className='  max-lg:w-full flex-wrap flex flex-col items-center justify-center 
    dark:text-white text-lg border-white'>
          <h1 className='text-2xl font-bold font-inter'>Bilgi</h1>
          <div className='dark:text-gray-400'>
            <button className=' flex items-center justify-center  text-lg p-2   w-[300px] text-gray-500 hover:underline dark:hover:text-white     rounded-lg  hover:scale-110 transition-all '>
              Site Tasarlama
            </button>

            <button className='flex items-center justify-center  text-lg p-2  w-[300px] text-gray-500 hover:underline dark:hover:text-white    rounded-lg  hover:scale-110 transition-all'>
              Site Yayınlama
            </button>
            <button className='flex items-center justify-center  text-lg p-2  w-[300px]  text-gray-500 hover:underline dark:hover:text-white    rounded-lg  hover:scale-110 transition-all'>
              Alan Adı Transferi
            </button>
            <button className='flex items-center justify-center  text-lg p-2  w-[300px]  text-gray-500 hover:underline dark:hover:text-white    rounded-lg  hover:scale-110 transition-all'>
              Güvenlik
            </button>
          </div>

        </div>

        <div className='  max-lg:w-full flex-wrap flex flex-col items-center justify-center 
dark:text-white text-lg border-white'>
          <h1 className='text-2xl font-bold font-inter'>Hizmetler</h1>
          <div className='dark:text-gray-400 '>
            <button className=' flex items-center justify-center  text-lg p-2   w-[300px]  text-gray-500 hover:underline dark:hover:text-white    rounded-lg  hover:scale-110 transition-all '>
              Web Tasarım
            </button>
            <button className='flex items-center justify-center  text-lg p-2  w-[300px]    text-gray-500 hover:underline dark:hover:text-white  rounded-lg  hover:scale-110 transition-all'>
              Web Programlama
            </button>
            <button className='flex items-center justify-center  text-lg p-2  w-[300px]  text-gray-500 hover:underline dark:hover:text-white   rounded-lg  hover:scale-110 transition-all'>
              Hosting
            </button>
            <button className='flex items-center justify-center  text-lg p-2  w-[300px]  text-gray-500 hover:underline dark:hover:text-white    rounded-lg  hover:scale-110 transition-all'>
              Domain-Alan Adı
            </button>
          </div>

        </div>

        <div className='  max-lg:w-full flex-wrap flex flex-col items-center justify-center 
dark:text-white text-lg border-white'>
          <h1 className='text-2xl font-bold font-inter'>Sosyal Medya</h1>
          <div className='dark:text-gray-400 '>
            <button className=' flex items-center justify-start pl-24 space-x-2   text-lg p-2 text-gray-500 hover:underline dark:hover:text-white  w-[300px]     rounded-lg  hover:scale-110 transition-all '>
              <FaInstagram className='text-xl text-red-400' /> <h1>İnstagram</h1>
            </button>
            <button className='flex items-center justify-start pl-24 space-x-2   text-lg p-2  w-[300px]  text-gray-500 hover:underline dark:hover:text-white    rounded-lg  hover:scale-110 transition-all'>
              <FaLinkedin className='text-xl text-sky-400' /><h1>Linkedin</h1>
            </button>
            <button className='flex items-center justify-start pl-24 space-x-2   text-lg p-2  w-[300px] text-gray-500 hover:underline dark:hover:text-white    rounded-lg  hover:scale-110 transition-all'>
              <FaGithub className='text-xl text-purple-500' /><h1>Github</h1>
            </button>
            <button className='flex items-center justify-start pl-24 space-x-2   text-lg p-2  w-[300px]  text-gray-500 hover:underline dark:hover:text-white    rounded-lg  hover:scale-110 transition-all'>
              <FaWhatsapp className='text-xl text-green-400' /><h1>Whatsapp</h1>
            </button>
          </div>

        </div>


      </div>

    </div>
  )
}

export default Footer