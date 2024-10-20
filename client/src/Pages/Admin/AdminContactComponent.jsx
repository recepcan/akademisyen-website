import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
function AdminContactComponent() {
    const { error, loading, data } = useSelector(state => state.texts)
    const dispatch = useDispatch()
    const [text, setText] = useState(null);


    const textId = '66f04e20c1fabe4fdd011488'
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
  return (
    <div className='p-5'>

            <div className='border-2 bg-white rounded-xl flex flex-col items-center space-y-5  p-5 relative'>

                <div className=' p-1  bg-black/30  rounded-2xl w-full md:w-2/3 flex  items-center justify-around'>
                    id: {
                        text?._id
                    }
                    <h1>
                        title: {
                            text?.title
                        }</h1>
                    
                </div>

               <div className='flex md:flex-row flex-col w-full items-start space-y-5 md:space-x-5'>
                
                {
                    text?.image && <img className='md:max-w-xs w-full object-contain rounded-xl' src={text?.image} alt="" />
                }
                <div
                    className="flex flex-col  text-center  w-full  leading-6 tracking-wider  post-content"
                    dangerouslySetInnerHTML={{ __html: text && text.content }} />

               </div>
               <Link 
                    to={`/update-text/${text?._id}`}
                    className='p-2 flex items-center justify-center text-center bg-sky-500 rounded-xl text-white min-w-32'>
                        Edit
                    </Link>
            </div>
        </div>
  )
}

export default AdminContactComponent