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
    }, [dispatch]);
    if (loading ) return <Loading/>

    if(error) return <div>{error}</div>
  return (
    <div className='grid  border-red-400  justify-items-center items-center 
    sm:grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  2xl:grid-cols-4 md:w-[75%]  flex-wrap py-20  gap-y-5'>
    
    {
     data.posts ?
       data?.posts?.map((post, i) => (
         <Link className='last: ' to={`/post/${post.slug}`} key={i}>
           <div className='w-[320px]   h-[400px] dark:shadow-none shadow-lg shadow-gray-400  group relative transition-all hover:scale-105 
           flex flex-col items-center space-y-5 rounded-lg dark:bg-gray-900 bg-white
             dark:border border-white'>
             <img className='w-full h-52   group-hover:rounded-lg duration-700 rounded-t-lg object-cover  transition-all border-b ' src={post.image} alt={post.title} />
            <div className='p-2'>
            <div className='text-xl line-clamp-1 font-bold p-1 backdrop-blur-sm rounded-lg  dark:bg-white/20 bg-sky-500/20  '>
            {post.title}
            </div>
            <div 
             className='p-1 max-w-2xl line-clamp-3 mx-auto w-full post-content ' >
              {post.explanation}
 
            </div>
            </div>
             
             <div className='absolute p-1 backdrop-blur-sm rounded-lg  dark:bg-white/20 bg-sky-500/20 text-xs left-1 bottom-1'>
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