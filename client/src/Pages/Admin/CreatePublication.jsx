import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {FileInput,Button} from 'flowbite-react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase.js';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function CreatePublication() {

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

 console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/publication/create', {
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
      
        navigate(`/admin?tab=publications`);
      }
    } catch (error) {
      toast.error(error.message,'Something went wrong');
    }
  };


  return (
    <div className='p-5 max-w-3xl mx-auto min-h-screen lg:pt-20 space-y-5'>
        <h1 className='text-center  text-3xl lg:text-5xl font-semibold font-inter'> 
        Create a Publication
        </h1>

        <form className='flex flex-col gap-4 space-y-5' onSubmit={handleSubmit}>

            <input 
            onChange={(e)=>setFormData({...formData,authors:e.target.value})} 
            type="text"
             placeholder='authors'
              required 
              id='authors' 
            className='flex-1 p-2 dark:bg-gray-900 border border-black dark:border-white rounded-lg  font-bold outline-1' />
           
            <textarea 
            onChange={(e)=>setFormData({...formData,content:e.target.value})}
             type="text" 
             placeholder='content' 
             required 
             id='content' 
        className='flex-1 w-full p-2 dark:bg-gray-900 border border-black dark:border-white rounded-lg  font-bold outline-1' />
            
     
      
        <input  onChange={(e)=>setFormData({...formData,link:e.target.value})} 
        type="text"
         placeholder='Bağlantı'
           
          id='link' 
        className='flex-1 p-2 dark:bg-gray-900 border border-black dark:border-white rounded-lg  font-bold outline-1' 
       />
            
               
                

               
                 
           <Button
           type='submit'
           gradientDuoTone='greenToBlue'
           size='xl'
           outline
           >
           Publish 
           </Button>
        </form>
        
    </div>
)
}

export default CreatePublication