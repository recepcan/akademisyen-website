import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function UpdateText() {
  const { currentUser } = useSelector(state => state.user);
  const { textId } = useParams();
const navigate=useNavigate()
  const [text, setText] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const res = await fetch(`/api/text/getTexts?textId=${textId}`);
            const data = await res.json();
            if (res.ok) {
              setText(data.texts[0]);
              console.log(data.texts[0])
            }
          } catch (error) {
            toast.error(error.message);
          }
        };
        if (currentUser.isAdmin) {
          fetchPosts();
        }
      }, [text._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setText(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(`/api/text/update/${text._id}/${currentUser._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(text),
      });
      
      // Yanıtın JSON formatında olduğunu varsayarak işle
      const data = await res.json();
  console.log(data)
      if (!res.ok) {
        // Sunucudan dönen hata mesajını kontrol et
        toast.error(data.message || 'Failed to update text');
        return;
      }
  
      if (res.ok) {
       // Başarılı güncelleme mesajı
       navigate(`/admin?tab=texts`);
       toast.success('Update successful');
      }

     
    } catch (error) {
      // Fetch hatası
      toast.error(`Error: ${error.message}`);
    }
  };


  return (
    <div className='md:pt-32 p-10 bg-gray-100 dark:bg-gray-900 dark:text-white
    min-h-screen flex flex-col items-center lg:justify-center text-center'>
      <div className='w-full flex flex-col  items-center justify-center'>
        <form onSubmit={handleSubmit} className='lg:w-1/2 w-full flex flex-col space-y-10'>
          <h1 className='text-3xl font-inter font-extrabold'>Text Content Update Form</h1>
          <textarea
            onChange={handleChange}
            rows="3"
            placeholder='Title'
            name="title"
            value={text.title || ''}
            className='p-3 rounded-lg w-full dark:bg-gray-900 dark:text-white dark:border dark:border-white'
          />
          <textarea
            onChange={handleChange}
            rows="5"
            placeholder='Content'
            name='content'
            value={text.content || ''}
            className='p-3 rounded-lg w-full dark:bg-gray-900 dark:text-white dark:border dark:border-white'
          />
          <button className='w-full p-3 bg-sky-700 rounded-lg text-white ' type='submit'>Update</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateText;