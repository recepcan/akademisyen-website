import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Oauth from '../../Components/Oauth'
import { toast } from 'react-toastify'
function SignUp() {
const navigate=useNavigate()
    const [formdata, setformData] = useState({username:"",email:"",password:""})
const handleChange=(e)=>{
          setformData({...formdata,[e.target.id]:e.target.value.trim()})
}
const handleSubmit = async (e)=>{
    e.preventDefault();
try {
  const res=  await fetch('/api/auth/sign-up',{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formdata)
    
    })
    const data = await res.json()
if(data.success===false){
    return toast.error(data.message)
}

if(res.ok){
    navigate('/giris-yap')
}

} catch (error) {
    toast.error(error)
}
}
    return (

        <div className='w-full p-10 space-x-5 min-h-screen font-inter 
        flex md:flex-row flex-col items-center justify-center'>


        <div className="md:w-1/3 w-full  md:h-[600px] p-3 md:p-10  
        flex  flex-col items-center justify-center ">
            <div className='flex  items-center justify-start'>
                <h1 className='bg-gradient-to-br from-green-300 via-teal-500 to-green-900 
                 text-white p-5 rounded-2xl text-3xl font-bold font-inter'>
                Yunus Altundağ
               </h1>
            </div>
            <h2 className='p-5   text-lg font-bold font-inter'>
           Bu sayfaya yalnızca site sahibi erişebilir.
            </h2>

        </div>

            <div className="md:w-1/2 w-full md:h-[400px] md:p-10 p-3  flex flex-col items-center  lg:justify-center ">
                <form className='flex  flex-col h-full   md:justify-evenly
                 w-full md:w-2/3 gap-5  shadow-gray-400 p-5 rounded-lg '
                  onSubmit={handleSubmit}>
                   
                    <div className='space-y-3'>
                        <div className='text-sm font-bold'>
                            your username
                            <input id='username' 
                            onChange={handleChange}
                             className='p-3 bg-transparent  border-2 rounded-lg  outline-none w-full' 
                             type="text" 
                             placeholder='username' />
                        </div>
                        <div 
                        className='text-sm font-bold'>
                            your email
                            <input 
                            id='email' 
                            onChange={handleChange} 
                            className='p-3  border-2 rounded-lg bg-transparent  outline-none w-full'
                             type="email" 
                             placeholder='email' />
                        </div>

                        <div 
                        className='text-sm font-bold'>
                            your password
                            <input 
                            id='password' 
                            onChange={handleChange} 
                            className='p-3  border-2 rounded-lg  bg-transparent outline-none w-full'
                             type="password" 
                             placeholder='password' />
                        </div>
                    </div>
                    <button className='bg-gradient-to-br from-green-300 via-teal-500 to-green-900 w-full p-5 rounded-lg  text-white hover:bg-sky-500 transition-all'>SignUp</button>
              <Oauth/>
                    </form>
            </div>

        </div>
    )
}

export default SignUp