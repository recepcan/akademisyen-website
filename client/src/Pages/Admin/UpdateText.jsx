import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function UpdateText() {
  const { currentUser } = useSelector(state => state.user);
  const { textId } = useParams();
  const [formData, setFormData] = useState([]);
const navigate=useNavigate()
  const [text, setText] = useState([]);
  console.log(textId,"text")

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const res = await fetch(`/api/text/getTexts?textId=${textId}`);
            const data = await res.json();
            if (res.ok) {
              setFormData(data.texts[0]);
              console.log(data.texts[0])
            }
          } catch (error) {
            toast.error(error.message);
          }
        };
        if (currentUser.isAdmin) {
          fetchPosts();
        }
      }, []);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setText(prevState => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/text/update/${textId}/${currentUser._id}`, {
        method: 'PATCH',
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
       console.log(res)
       navigate(`/admin?tab=texts`);
      }
    } catch (error) {
      toast.error('Something went wrong',error.message);
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen md:pt-20 space-y-5  '>
    <h1 className='text-center text-3xl  font-semibold font-inter'> Update Text</h1>

    <form className='flex flex-col gap-4 space-y-10' 
    onSubmit={handleSubmit}>

        <input 
        value={formData.title}
         onChange={(e)=>setFormData({...formData,title:e.target.value})}
          type="text" 
          placeholder='Title' 
          
          id='title'
           className='flex-1 p-2  rounded-lg  font-bold outline-1 dark:border dark:border-white  dark:bg-gray-900 dark:text-white ' />
        
           
        <ReactQuill value={formData.content}
         theme='snow' 
         placeholder='write on the line' 
         className=' ' 
         onChange={
            (value)=>{
                setFormData({...formData,content:value})
            }
        }/>
        <button  type='submit '
         className='bg-gradient-to-tr p-4 rounded-lg text-white font-bold
          bg-gradient from-pink-600 via-purple-500 to-blue-500'>
           Update
           </button>
    </form>
</div>
  );
}

export default UpdateText;