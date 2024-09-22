import React from 'react'
import Editor from './Editor'
import GetPosts from '../../Components/GetPosts'
import Hakkinda from '../Hakkinda/Hakkinda'
import ProfilCard from './ProfilCard'

function Anasayfa() {
  
  return (
    <div className='min-h-screen  
    flex flex-col items-center justify-center space-y-20  '>
<ProfilCard/>

<div className='w-full flex flex-col items-center justify-center'>
<h1 className='text-5xl font-bold '>Blog</h1>
    <GetPosts limit={3}/>
</div>
   {/* <Editor/>*/}
  
    </div>
  )
}

export default Anasayfa