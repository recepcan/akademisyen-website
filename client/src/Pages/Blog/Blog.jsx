import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { fetchPosts } from '../../redux/postsSlice';
import { Link } from 'react-router-dom';
function Blog() {

  
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.posts);
  const { currentUser } = useSelector((state) => state.user);


  useEffect(() => {
    if (currentUser && currentUser._id) {
      dispatch(fetchPosts(currentUser));

    }
   
  }, [dispatch, currentUser]);
  return (
    <div className='w-full flex flex-col min-h-screen  justify-center items-center'>
    <h1 className='text-5xl font-extrabold font-mono p-5 rounded-lg uppercase '>Blog</h1>
   <div className='grid  border-red-400  justify-items-center items-center 
   sm:grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  2xl:grid-cols-4 md:w-[75%]  flex-wrap py-20  gap-y-5'>
   
   {
    data.posts ?
      data?.posts?.map((post, i) => (
        <Link className='last: ' to={`/post/${post.slug}`} key={i}>
          <div className='w-[320px]   h-[400px] dark:shadow-none shadow-lg shadow-gray-400  group relative transition-all hover:scale-105 
          flex flex-col items-center space-y-5 rounded-lg dark:bg-gray-900 bg-white
            dark:border border-white'>
            <img className='w-full h-52  md:group-hover:h-[300px] group-hover:rounded-lg duration-700 rounded-t-lg object-cover  transition-all border-b ' src={post.image} alt={post.title} />
            <div className='text-xl line-clamp-1 font-bold p-1 backdrop-blur-sm rounded-lg  dark:bg-white/20 bg-sky-500/20  '>
            {post.title}
            </div>
            <div 
             className='p-1 max-w-2xl line-clamp-3 mx-auto w-full post-content ' >
              {post.explanation}

            </div>
            <div className='p-1 backdrop-blur-sm rounded-lg  dark:bg-white/20 bg-sky-500/20 absolute text-xs right-1 bottom-1'>
              {post.category}
            </div>
            <div className='absolute p-1 backdrop-blur-sm rounded-lg  dark:bg-white/20 bg-sky-500/20 text-xs left-1 bottom-1'>
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </Link>
      )) : "there is no post yet"
  }
  
  </div>


  </div>
  )
}

export default Blog