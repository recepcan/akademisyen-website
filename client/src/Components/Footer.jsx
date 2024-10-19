import React from 'react'
import { FaReact, FaInstagram, FaLinkedin, FaWhatsapp, FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div className='w-full    bottom-0 right-0 left-0 dark:shadow-none  border-red-500 
           text-black flex flex-col  max-md:space-y-8 
           justify-center text-center items-center 
        dark:text-white  transition-colors duration-300 dark:z-50 flex-1'>
      <div className='flex items-center justify-center flex-col w-full space-y-5 p-5
       bg-transparent '>
        <Link to="/">
          <div className='flex items-center justify-center'>
            <h1 className='border border-black   dark:border-white p-2 rounded-2xl text-xl md:text-3xl font-bold font-sans'>
            Recep Can
            </h1>
          </div>
        </Link>
        <h2> Copyright©2024 Recep Can. All rights reserved.</h2>
        <hr className='w-[90%] border-black  dark:border-sky-400 ' />
      </div>

      <div className='w-full flex flex-wrap  2xl:w-[1536px] flex-row items-center justify-around p-4  border-black'>

        <div className='py-8     flex-wrap flex flex-col items-center justify-center 
    dark:text-white text-lg border-white'>
          <h1 className='text-2xl font-bold font-inter'>Bilgi</h1>
          <div className='dark:text-gray-400'>
            <button className=' flex items-center justify-center  text-lg p-2   w-[300px] text-gray-500 hover:underline dark:hover:text-white     rounded-lg  hover:scale-110 transition-all '>
             Lorem, ipsum dolor.
            </button>

            <button className='flex items-center justify-center  text-lg p-2  w-[300px] text-gray-500 hover:underline dark:hover:text-white    rounded-lg  hover:scale-110 transition-all'>
            Lorem, ipsum dolor.
            </button>
            <button className='flex items-center justify-center  text-lg p-2  w-[300px]  text-gray-500 hover:underline dark:hover:text-white    rounded-lg  hover:scale-110 transition-all'>
            Lorem, ipsum dolor.
            </button>
            <button className='flex items-center justify-center  text-lg p-2  w-[300px]  text-gray-500 hover:underline dark:hover:text-white    rounded-lg  hover:scale-110 transition-all'>
            Lorem, ipsum dolor.
            </button>
          </div>

        </div>

        <div className='py-8     flex-wrap flex flex-col items-center justify-center 
dark:text-white text-lg border-white'>
          <h1 className='text-2xl font-bold font-inter'>Hizmetler</h1>
          <div className='dark:text-gray-400 '>
            <button className=' flex items-center justify-center  text-lg p-2   w-[300px]  text-gray-500 hover:underline dark:hover:text-white    rounded-lg  hover:scale-110 transition-all '>
            Lorem, ipsum dolor.
            </button>
            <button className='flex items-center justify-center  text-lg p-2  w-[300px]    text-gray-500 hover:underline dark:hover:text-white  rounded-lg  hover:scale-110 transition-all'>
            Lorem, ipsum dolor.
            </button>
            <button className='flex items-center justify-center  text-lg p-2  w-[300px]  text-gray-500 hover:underline dark:hover:text-white   rounded-lg  hover:scale-110 transition-all'>
            Lorem, ipsum dolor.
            </button>
            <button className='flex items-center justify-center  text-lg p-2  w-[300px]  text-gray-500 hover:underline dark:hover:text-white    rounded-lg  hover:scale-110 transition-all'>
            Lorem, ipsum dolor.
            </button>
          </div>

        </div>

        

        <div className='py-8     flex-wrap flex flex-col items-center justify-center 
    dark:text-white text-lg border-white'>
          <h1 className='text-2xl font-bold font-inter'>Kariyer</h1>
          <div className='dark:text-gray-400'>
            <button className=' flex items-center justify-center  text-lg p-2   w-[300px] text-gray-500 hover:underline dark:hover:text-white     rounded-lg  hover:scale-110 transition-all '>
             Lorem, ipsum dolor.
            </button>

            <button className='flex items-center justify-center  text-lg p-2  w-[300px] text-gray-500 hover:underline dark:hover:text-white    rounded-lg  hover:scale-110 transition-all'>
            Lorem, ipsum dolor.
            </button>
            <button className='flex items-center justify-center  text-lg p-2  w-[300px]  text-gray-500 hover:underline dark:hover:text-white    rounded-lg  hover:scale-110 transition-all'>
            Lorem, ipsum dolor.
            </button>
            <button className='flex items-center justify-center  text-lg p-2  w-[300px]  text-gray-500 hover:underline dark:hover:text-white    rounded-lg  hover:scale-110 transition-all'>
            Lorem, ipsum dolor.
            </button>
          </div>

        </div>

        <div className='py-8     flex-wrap flex flex-col items-center justify-center 
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

// grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4