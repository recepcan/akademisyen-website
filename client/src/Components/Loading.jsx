import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
function Loading() {
  return (
    <div className='max-h-screen  flex items-center justify-center 
    absolute top-0 left-0 bottom-0 right-0 z-50 backdrop-blur-md  bg-white/20 dark:bg-[#030620] dark:text-white '>
      <div className='animate-spin-slow  '>
      <AiOutlineLoading3Quarters className='w-16 h-16'/></div>
    </div>
  )
}

export default Loading