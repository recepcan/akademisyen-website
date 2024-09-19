import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { fetchTextById } from '../../redux/textsSlice'
import Loading from '../../Components/Loading'
function Hakkinda() {
  const { textByIdError, textByIdLoading, textById } = useSelector(state => state.texts)
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const textId = '66eb4c5945b0189fbcc14b9a'
  useEffect(() => {
    if (textId) {
      dispatch(fetchTextById(textId));
    }
  }, [dispatch, textId]);

  if (textByIdLoading) return <Loading />
  if (textByIdError) return <div className='min-h-screen flex items-center justify-center'>Error: {textByIdError}</div>;
  

  return (
    <div className='min-h-screen flex flex-col items-center space-y-8 p-5 '> 
    <h1 className='text-3xl'>HAKKINDA</h1>

     <div className='bg-white dark:bg-gray-950 dark:border border-white relative
      rounded-2xl  post-content w-full  lg:w-[90%] flex flex-col md:flex-row  p-5 space-y-5 md:space-x-8 justify-start '>
     
     <div className='md:w-1/3 w-full h-[500px] md:sticky top-0 bg-gray-400 rounded-lg'>
     
     </div>
     
     <div
       className="p-3  mx-auto w-full md:w-2/3 leading-6 tracking-wider "
        dangerouslySetInnerHTML={{ __html: textById && textById.content }}/>
     </div> 

    
    
    </div>
  )
}

export default Hakkinda