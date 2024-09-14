import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateText() {
const userId=useParams()
  
const currentUser =useSelector(state=>state.user)
  const [formData, setFormData] = useState({});


  const navigate = useNavigate();

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/text/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      if (res.ok) {
      toast.success('create success')
        navigate(`/admin?tab=texts`);
      }
    } catch (error) {
      toast.error(error.message,'Something went wrong');
    }
  };



  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen pt-20 bg-sky-300'>
    <h1 className='text-center text-3xl my-7 font-semibold'> Create a text</h1>

    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

        <input onChange={(e)=>setFormData({...formData,title:e.target.value})} type="text" placeholder='Title' required
         id='title' className='flex-1 p-2  rounded-lg  font-bold outline-1' />
        
            
        <ReactQuill theme='snow' placeholder='write on the line' 
        className='h-72 mb-12' 
        onChange={
            (value)=>{
                setFormData({...formData,content:value})
            }
        }/>
        <button  type='submit ' className='bg-gradient-to-tr p-4 rounded-lg text-white font-bold bg-gradient from-pink-600 via-purple-500 to-blue-500'> Publish</button>
    </form>
    
</div>
  )
}

export default CreateText