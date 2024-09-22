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
    <div className='w-3/4 h-[600px] border  rounded-xl p-5 flex items-center justify-center'>
    <div className='w-1/3 h-full   border flex items-center justify-center'>
    <img src={textById?.image} alt="" />
    </div>
    
    <div className='w-2/3 h-full   border flex items-center justify-center'>
    <div
       className="p-3  mx-auto w-full md:w-2/3 leading-6 tracking-wider "
        dangerouslySetInnerHTML={{ __html: textById && textById.content }}/>
    </div>

    </div>
  )
}

export default ProfilCard