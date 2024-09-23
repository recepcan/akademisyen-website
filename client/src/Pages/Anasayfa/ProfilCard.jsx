import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTextById } from '../../redux/textsSlice'
import Loading from '../../Components/Loading'

function ProfilCard() {
    const { textByIdError, textByIdLoading, textById } = useSelector(state => state.texts)
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const textId = '66f08302dfdee82f39a051b7'
  useEffect(() => {
    if (textId) {
      dispatch(fetchTextById(textId));
    }
  }, [dispatch, textId]);

  if (textByIdLoading) return <Loading />
  if (textByIdError) return <div className='min-h-screen flex items-center justify-center'>Error: {textByIdError}</div>;
  


  return (
    <div className='lg:w-3/4 w-full md:min-h-[500px]   rounded-xl dark:border 
    flex md:flex-row flex-col dark:shadow-none shadow-xl shadow-gray-400 
    '>
    
    <div className='md:w-1/2  w-full md:min-h-[500px]     flex items-center justify-center p-5'>
    <img src={textById?.image} alt="" 
    className=' w-[320px] h-[320px]  rounded-xl '/>
    </div>
    
    <div className='md:w-1/2 w-full min-h-[500px]    
     flex flex-col items-center justify-center p-5 space-y-5'>
   <div
       className="flex flex-col text-center  w-full  leading-6 tracking-wider  post-content"
        dangerouslySetInnerHTML={{ __html: textById && textById.content }}/>
        <button className='p-3 w-full rounded-lg bg-sky-600 text-white font-bold '>İletişime Geç</button>

    </div>
    </div>
  )
}

export default ProfilCard