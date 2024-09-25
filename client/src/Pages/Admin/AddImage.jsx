import React, { useState } from 'react'
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
import { getAuth } from 'firebase/auth';




function AddImage() {
    const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
//   const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
//   const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();
  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        toast.error('Please select an image');
        return;
      }
  
      // Firebase kimlik doğrulama işlemi ve token alma
      const auth = getAuth(app);
      const user = auth.currentUser;
  
      // Kullanıcının giriş yapıp yapmadığını kontrol edin
      if (!user) {
        toast.error('User is not authenticated');
        return;
      }
  
      // Asenkron olarak token'ı alın
      const token = await user.getIdToken();
  
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
  
      // Token'ı metadata'ya ekliyoruz
      const metadata = {
        customMetadata: {
          authToken: token,
        },
      };
  
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          toast.error('Image upload failed: ' + error.message);
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
      toast.error('Image upload failed: ' + error.message);
      setImageUploadProgress(null);
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // handleUploadImage fonksiyonunu bekleyin ve sonucunu kontrol edin
     
  
      // Eğer image yükleme başarısız olursa işlemi iptal edin
    
  
      // Resim yükleme başarılıysa post oluşturma işlemini başlatın
      const res = await fetch('/api/image/create', {
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
        navigate(`/admin?tab=galeri`);
      }
    } catch (error) {
      toast.error(error.message, 'Something went wrong');
    }
  };
  


    return (
        <div className='p-5 max-w-3xl mx-auto min-h-screen lg:pt-20 space-y-5'>
            <h1 className='text-center  text-3xl lg:text-5xl font-semibold font-inter'> 
            Add New Image
            </h1>

            <form className='flex flex-col gap-4 space-y-5' 
            onSubmit={handleSubmit}>

                <input 
                onChange={(e)=>setFormData({...formData,title:e.target.value})} 
                type="text"
                 placeholder='Title'
                  required 
                  id='title' 
                className='flex-1 p-2 dark:bg-gray-900 border border-black dark:border-white rounded-lg  font-bold outline-1' />
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
                        ):("upload")
                    }</Button>
            
                
                    </div>
                    {
                        formData.image && (
                            <div className='w-full  flex items-center justify-center bg-sky-200'>
                            <img src={formData.image} alt='upload' className='w-full h-72 object-contain'/>
                      
                            </div>  )
                    }

                   
                   
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

export default AddImage