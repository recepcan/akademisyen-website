import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTextById, fetchTexts } from '../../redux/textsSlice'
import Loading from '../../Components/Loading'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function ProfilCard() {
    const { error, loading,data } = useSelector(state => state.texts)
    const dispatch = useDispatch()
  const [text, setText] = useState(null);
  

  const textId = '66f08302dfdee82f39a051b7'
  useEffect(() => {
    const fetchText = async () => {
      try {
          const res = await fetch(`/api/text/getTexts?textId=${textId}`);
          const data = await res.json();
          if (!res.ok) {
              toast.error(data.message);
              return;
          }
          if (res.ok) {
              setText(data.texts[0]);
          }
      } catch (error) {
          toast.error(error.message);
      }
  };
  fetchText();
  }, [dispatch, textId]);

  if (loading) return <Loading />
  if (error) return <div className='min-h-screen flex items-center justify-center'>Error: {error}</div>;
  


  return (
    <div className='lg:w-3/4 w-full md:min-h-[500px]   rounded-xl dark:border 
    flex md:flex-row flex-col dark:shadow-none shadow-xl shadow-gray-400 
    '>
    
    <div className='md:w-1/2  w-full md:min-h-[500px]     flex items-center justify-center p-5'>
    <img loading='lazy' src={text?.image} alt="" 
    className=' w-[320px] h-[320px]  rounded-xl '/>
    </div>
    
    <div className='md:w-1/2 w-full min-h-[500px]    
     flex flex-col items-center justify-center p-5 space-y-5'>
   <div
       className="flex flex-col text-center  w-full  leading-6 tracking-wider  post-content"
        dangerouslySetInnerHTML={{ __html: text && text.content }}/>
        <Link to="/iletisim"
         className='p-3 flex items-center justify-center text-center w-full rounded-lg bg-sky-600 text-white font-bold '>
         İletişime Geç</Link>

    </div>
    </div>
  )
}

export default ProfilCard