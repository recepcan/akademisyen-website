import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTexts } from '../../redux/textsSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function AdminTextsComponent() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.texts);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    if (currentUser && currentUser._id) {
      dispatch(fetchTexts(currentUser));
    }
  }, [dispatch, currentUser]);

  console.log('Component data:', data); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error(error);
    return <div>Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div>No texts available</div>;
  }

  return (
    <div className=' w-full min-h-screen  flex-1 p-3 space-y-5 rounded-lg font-sans'>
      {data?.texts?.map((text, i) => (
        <div key={i} className='p-7 dark:bg-[#1a2e44] bg-gray-100 space-y-2 relative rounded-lg'>
          <div className='text-xs absolute right-2 top-2'>
          textId: 
          <span className='text-sky-700'>
          {text._id}</span>
          </div>
          <div className='text-red-500 text-lg'>
          <span className='dark:text-white text-black font-extrabold text-xl p-1'>
          Title:</span>{text.title}
          </div>
          <div className='pl-3 flex post-content text-md '>
          <span className='dark:text-white text-black font-extrabold text-lg p-1 '>
          Content:</span>
         <p className='w-3/4 line-clamp-3'>
         {text.content}
         </p>

          {
            text.image&& <img className='w-1/4 h-40 ' src={text.image} alt="" />
          }
          </div>
          
          <div>
            <Link to={`/update-text/${text._id}`}>
              <button className='p-2 rounded-lg bg-sky-600 text-white w-full md:w-56'> Edit</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}


export default AdminTextsComponent;