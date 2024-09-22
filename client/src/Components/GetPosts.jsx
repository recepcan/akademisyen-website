import React, { useEffect, useMemo, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { fetchPosts } from '../redux/postsSlice';
import { Link } from 'react-router-dom';
import Loading from './Loading';
function GetPosts({limit}) {

    const { data, loading, error } = useSelector(state => state.posts);
    const { currentUser } = useSelector((state) => state.user);
    const dispatch=useDispatch()
  
    useEffect(() => {
      // Her dataLength değiştiğinde veriyi yeniden çek
      dispatch(fetchPosts(limit));
    }, [dispatch,limit]);
    if (loading ) return <Loading/>

    if(error) return <div>{error}</div>
  return (
    <div className='grid    border-red-400 justify-items-center  items-center overflow-hidden
    sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3  
       max-w-[1080px]
      w-full   flex-wrap py-20  gap-y-5'>
    
    {
     data.posts ?
       data?.posts?.map((post, i) => (
         <Link className=' border-blue-500 ' to={`/post/${post.slug}`} key={i}>
           <div className='w-[320px]   h-[400px] dark:shadow-none shadow-lg shadow-gray-400  group relative transition-all hover:scale-105 
           flex flex-col items-center  rounded-lg dark:bg-gray-900 bg-white
             dark:border border-white'>
             <img className='w-full h-52   group-hover:rounded-lg duration-700 rounded-t-lg object-cover  transition-all border-b ' 
             src={post.image} alt={post.title} />
           
             <div className='p-2 w-full flex-1'>
            <div className='text-lg line-clamp-2 font-bold p-1 text-center w-full '>
            {post.title}
            </div>
            <div 
             className='p-1  line-clamp-4 mx-auto w-full  text-start ' >
              {post.explanation}
 
            </div>
            </div>
             
             <div className='absolute p-1 backdrop-blur-sm rounded-lg  bg-gray-500/10  text-xs left-1 bottom-1'>
               {new Date(post.createdAt).toLocaleDateString()}
             </div>
           </div>
         </Link>
       )) : "there is no post yet"
   }
   
   </div>
  )
}

export default GetPosts