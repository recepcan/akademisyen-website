import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTextById } from '../../redux/textsSlice';

function AnimationCard() {
    const [width, setWidth] = useState('300px'); // Başlangıç genişliği
    const [height, setHeight] = useState('300px'); // Başlangıç yüksekliği
    const { textByIdError, textByIdLoading, textById } = useSelector(state => state.texts)
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
  
    const textId = '66f1694c41f7db638012b023'
    useEffect(() => {
      if (textId) {
        dispatch(fetchTextById(textId));
      }
    }, [dispatch, textId]);
console.log(textById,"textıd= 66f1694c41f7db638012b023")

    useEffect(() => {
        const handleScroll = () => {
          const scrollY = window.scrollY;
          // Genişlik artışı
          const newWidth = Math.min(window.innerWidth, 600 + scrollY);
          setWidth(`${newWidth}px`);
    
          // Yükseklik artışı
          const newHeight = Math.min(window.innerHeight, 50 + scrollY);
          setHeight(`${newHeight}px`);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll); // Temizleme
        };
      }, []);
  return (
   <>
   <div
   style={{ width,height }} // Dinamik genişlik
   className='transition-all duration-1000 ease-out  max-w-full max-h-[400px]  max-lg:hidden  rounded-xl  relative'
 >
 <img src={textById?.image} alt="" className='w-full   h-full rounded-xl'/>
  <div className='w-[450px] p-5 dark:shadow-none shadow-lg
   shadow-white h-full bg-white dark:bg-gray-900 
    z-10 absolute left-24 top-0 flex flex-col justify-around items-center'>
  <div
  className="flex flex-col text-center  w-full  leading-6 tracking-wider  post-content"
   dangerouslySetInnerHTML={{ __html: textById && textById.content }}/>
   <button className='p-3 w-1/2 rounded-lg bg-sky-600 text-white font-bold '>Devamını Oku</button>

  </div>



 </div>


 <div       
       className='max-w-full  rounded-xl  lg:hidden  w-full p-5 dark:shadow-none shadow-lg shadow-white h-full bg-white dark:bg-gray-900  
       flex flex-col justify-around items-center '
     >  
      <div
      className="flex flex-col text-center  w-full  leading-6 tracking-wider  post-content"
       dangerouslySetInnerHTML={{ __html: textById && textById.content }}/>
       <button className='p-3 w-1/2 rounded-lg bg-sky-600 text-white font-bold '>
       Devamını Oku
       </button>
     </div>
     
   </>
  )
}

export default AnimationCard