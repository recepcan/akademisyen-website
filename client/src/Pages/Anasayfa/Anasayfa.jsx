import React from 'react'
import Editor from './Editor'
import GetPosts from '../../Components/GetPosts'

function Anasayfa() {
  
  return (
    <div className='min-h-screen w-full flex flex-col items-center  p-5 '>
    <GetPosts limit={3}/>
   {/* <Editor/>*/}
    </div>
  )
}

export default Anasayfa