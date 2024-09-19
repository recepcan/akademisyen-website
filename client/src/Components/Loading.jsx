import React, { useEffect } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
function Loading() {
  useEffect(() => {
    // Scroll'u devre dışı bırakmak için body'ye overflow hidden uyguluyoruz
    document.body.style.overflow = 'hidden';
    
    // Komponent kaldırıldığında scroll'u geri getiriyoruz
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className='max-h-screen  flex items-center justify-center 
    fixed inset-0 z-50 backdrop-blur-md  bg-white/20 dark:bg-[#030620] dark:text-white '>
      <div className='animate-spin-slow  '>
      <AiOutlineLoading3Quarters className='w-16 h-16'/></div>
    </div>
  )
}

export default Loading