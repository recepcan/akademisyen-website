import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
function AdminHomeComponent() {
  const { error, loading, data } = useSelector(state => state.texts)
  const dispatch = useDispatch()
  const [text, setText] = useState(null);


  const textIds = ['66f08302dfdee82f39a051b7', '66f1694c41f7db638012b023'];
const [texts, setTexts] = useState([]);

useEffect(() => {
    const fetchTexts = async () => {
        try {
            // Join the text IDs into a single query parameter
            const res = await fetch(`/api/text/getTexts?textIds=${textIds.join(',')}`);
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message);
                return;
            }
            // Set the response texts directly into the state
            setTexts(data.texts);
        } catch (error) {
            toast.error(error.message);
        }
    };
    fetchTexts();
}, [dispatch, textIds]);


  return (
    <div className='flex'>
    <div className=' space-y-3 '>
    {texts?.map((item,index)=>(
      <div key={index} className='border-2 p-2 rounded-xl dark:border-white border-black flex flex-col items-center justify-center text-center'>
     
      <h1>{
        item.title
      }</h1>

      <div
                    className="flex flex-col  text-center  w-full  leading-6 tracking-wider  post-content"
                    dangerouslySetInnerHTML={{ __html: item && item.content }} />

                    <Link 
                    to={`/update-text/${item?._id}`}
                    className='p-2 flex items-center justify-center text-center
                     bg-sky-500 rounded-xl text-white w-32 '>
                        Edit
                    </Link>          
     
      </div>
    ))}
    </div>

    
    
    </div>
  )
}

export default AdminHomeComponent