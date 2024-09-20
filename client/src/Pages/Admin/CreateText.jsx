import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
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

function CreateText() {
  const userId = useParams()

  const currentUser = useSelector(state => state.user)
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);

  const navigate = useNavigate();

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        toast.error('Please select an image');
        return;
      }
     
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        
        (error) => {
          toast.error('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
           
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      toast.error('Image upload failed');
      setImageUploadProgress(null);
     toast.error(error);
    }
  };


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
      toast.error(error.message, 'Something went wrong');
    }
  };



  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen pt-20 '>
      <h1 className='text-center text-3xl my-7 font-semibold'> Create a text</h1>

      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

        <input
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          type="text"
          placeholder='Title'
          id='title'
          className='flex-1 p-2  rounded-lg  font-bold outline-1'
        />
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : ("upload")
            }</Button>


        </div>

        {
          formData.image && (
            <div className='w-full  flex items-center justify-center bg-sky-200'>
              <img src={formData.image} alt='upload' className='w-full h-72 object-contain' />

            </div>)
        }



        <ReactQuill theme='snow'
          placeholder='write on the line'
          className='h-72 mb-12'
          onChange={
            (value) => {
              setFormData({ ...formData, content: value })
            }
          } />
        <button
          type='submit '
          className='bg-gradient-to-tr p-4 rounded-lg text-white font-bold
          bg-gradient from-pink-600 via-purple-500 to-blue-500'>
          Publish
        </button>
      </form>

    </div>
  )
}

export default CreateText