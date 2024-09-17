import { Button, FileInput } from 'flowbite-react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreatePublication() {
  const [formData, setFormData] = useState({
    // authors: '',
    content: '',
    // link: '',
    // dergi: '',
    tarih: '', 
    category: 'bildiri', // Default category
  });
  console.log(formData)
  const navigate = useNavigate();

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

      toast.success('Publication created successfully');
      navigate(`/admin?tab=publications`);
    } catch (error) {
      toast.error('Something went wrong: ' + error.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleCategoryChange = (e) => {
    setFormData((prevData) => ({ ...prevData, category: e.target.value }));
  };

  return (
    <div className='p-5 max-w-3xl mx-auto min-h-screen lg:pt-20 space-y-5'>
      <h1 className='text-center text-3xl lg:text-5xl font-semibold font-inter'>
        Create a Publication
      </h1>
<form className='flex flex-col gap-4 space-y-5' onSubmit={handleSubmit}>
      <div className='  border-red-500 lg:h-80 h-72'>
               <ReactQuill 
               theme='snow'
                placeholder='write on the line' 
                className='lg:h-72 h-52 dark:text-white'
                onChange={
                   (value)=>{
                       setFormData((prevData) =>({...prevData,content:value}))
                   }
               }/>
               </div>
              <div className='w-full space-x-3 flex'>
              <input
              onChange={(e) => setFormData((prevData) => ({ ...prevData, tarih: e.target.value }))}
              type="date"
              id='tarih'
              value={formData.tarih}
              className='flex-1 p-2 w-1/2 dark:bg-gray-900 border border-black dark:border-white rounded-lg font-bold outline-1'
            />
    
            <select
              onChange={handleCategoryChange}
              id='category'
              value={formData.category}
              className='flex-1 p-2 w-1/2 dark:bg-gray-900 border border-black dark:border-white rounded-lg font-bold outline-1'
            >
              <option value='bildiri'>Bildiri</option>
              <option value='kitap'>Kitap</option>
              <option value='makale'>Makale</option>
            </select>
              
              </div>
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
  );
}

export default CreatePublication;



{/*
  
  <form className='flex flex-col gap-4 space-y-5' onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder='Authors'
          required
          id='authors'
          value={formData.authors}
          className='flex-1 p-2 dark:bg-gray-900 border border-black dark:border-white rounded-lg font-bold outline-1'
        />

        <textarea
          onChange={handleChange}
          placeholder='Content'
          required
          id='content'
          value={formData.content}
          className='flex-1 w-full p-2 dark:bg-gray-900 border border-black dark:border-white rounded-lg font-bold outline-1'
        />

        <input
          onChange={handleChange}
          type="text"
          placeholder='Link'
          id='link'
          value={formData.link}
          className='flex-1 p-2 dark:bg-gray-900 border border-black dark:border-white rounded-lg font-bold outline-1'
        />

        <input
          onChange={handleChange}
          type="text"
          placeholder='Dergi'
          id='dergi'
          value={formData.dergi}
          className='flex-1 p-2 dark:bg-gray-900 border border-black dark:border-white rounded-lg font-bold outline-1'
        />

        <input
          onChange={(e) => setFormData((prevData) => ({ ...prevData, tarih: e.target.value }))}
          type="date"
          id='tarih'
          value={formData.tarih}
          className='flex-1 p-2 dark:bg-gray-900 border border-black dark:border-white rounded-lg font-bold outline-1'
        />

        <select
          onChange={handleCategoryChange}
          id='category'
          value={formData.category}
          className='flex-1 p-2 dark:bg-gray-900 border border-black dark:border-white rounded-lg font-bold outline-1'
        >
          <option value='bildiri'>Bildiri</option>
          <option value='kitap'>Kitap</option>
          <option value='makale'>Makale</option>
        </select>

        <Button
          type='submit'
          gradientDuoTone='greenToBlue'
          size='xl'
          outline
        >
          Publish
        </Button>
      </form>


  */}

