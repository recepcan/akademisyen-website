import React from 'react'
import Editor from './Editor'
import GetPosts from '../../Components/GetPosts'
import Hakkinda from '../Hakkinda/Hakkinda'

function Anasayfa() {
  
  return (
    <div className='min-h-screen  
    flex flex-col items-center justify-center space-y-8  '>
    <GetPosts limit={3}/>
   {/* <Editor/>*/}
  
    </div>
  )
}

export default Anasayfa