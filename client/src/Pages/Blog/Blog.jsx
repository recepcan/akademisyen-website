import React, { useEffect, useMemo, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { fetchPosts } from '../../redux/postsSlice';
import { Link } from 'react-router-dom';
import GetPosts from '../../Components/GetPosts';
function Blog() {

  
  const { data, loading, error } = useSelector(state => state.posts);
 
  
 

  return (
    <div className='w-full flex flex-col min-h-screen  justify-center items-center'>
    <h1 className='text-5xl font-extrabold font-titillium p-5 rounded-lg uppercase '>Blog</h1>
   <GetPosts/>


  </div>
  )
}

export default Blog