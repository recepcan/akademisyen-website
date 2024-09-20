import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase.js';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate ,useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchServices } from '../../redux/servicesSlice.js';

function UpdateService() {
  const {serviceId}=useParams()
  const navigate = useNavigate();
    const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
//   const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
//   const [publishError, setPublishError] = useState(null);
const {currentUser}=useSelector(state=>state.user)
const {data,error,loading}=useSelector(state=>state.services)

// useEffect(() => {
//   try {
//     if (serviceId ) {
//         dispatch(fetchServices(serviceId));
//       }
//       if (!res.ok) {
          
//         toast.error(data.message);
//         return;
//       }
//       if (res.ok) {
//         toast.success('veri çekme başarılı');
//         setFormData(data.services[0]);
//         console.log(data.services[0])
//       }
//   } catch (error) {
//     toast.error(error.message)
//   }
//   }, [dispatch, serviceId]);

 
useEffect(() => {
    try {
      const fetchService = async () => {
        const res = await fetch(`/api/service/getservices?serviceId=${serviceId}`);
        const data = await res.json();
        if (!res.ok) {
          
          toast.error(data.message);
          return;
        }
        if (res.ok) {
          toast.success('veri çekme başarılı');
          setFormData(data.services[0]);
          console.log(data.services[0])
        }
      };

      fetchService();
    } catch (error) {
     
      toast.error(error.message)
    }
  }, [serviceId]);





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
          toast.error('Image upload failed',error.message);
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
      const res = await fetch(`/api/service/updateservice/${formData._id}/${currentUser._id}`, {
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
        navigate(`/admin?tab=services`);
      }
    } catch (error) {
      toast.error('Something went wrong',error.message);
    }
  };



    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen md:pt-20 space-y-5 dark:bg-gray-900 dark:text-white '>
            <h1 className='text-center text-3xl  font-semibold font-inter'> Update Post</h1>

            <form className='flex flex-col gap-4 space-y-10' onSubmit={handleSubmit}>

                <input 
                value={formData.title}
                 onChange={(e)=>setFormData({...formData,title:e.target.value})}
                  type="text" 
                  placeholder='Title' 
                  required 
                  id='title'
                   className='flex-1 p-2  rounded-lg  font-bold outline-1 dark:border dark:border-white  dark:bg-gray-900 dark:text-white ' />
                <div 
                className='border-4 gap-4 flex md:flex-row flex-col justify-between items-center
                 border-teal-500 border-dotted p-3 '>
                    <input  
                    onChange={(e)=>setFile(e.target.files[0])} 
                    type="file" accept='image/*' 
                    className='bg-gradient-to-tr p-1 rounded-lg text-white font-bold dark:border dark:border-white
                    bg-gradient from-pink-600 via-purple-500 to-blue-500' />
                    <button
                     type='button' 
                     onClick={handleUpdloadImage} 
                     disabled={imageUploadProgress} 
                     className='bg-gradient-to-tr p-2 rounded-lg text-white font-bold 
                     bg-gradient from-pink-600 via-purple-500 to-blue-500'> {
                        imageUploadProgress? (
                            <div className='w-16 h-16'> 
                            <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`}/>
                            </div>
                        ):("upload")
                    }</button>
            
                
                    </div>
                    {
                        formData.image && (
                            <div className='w-full h-80 flex items-center justify-center bg-sky-100'>
                            <img src={formData.image} alt='upload' 
                            className='w-full h-52 lg:h-72 object-cover'/>
                      
                            </div>  )
                    }
                <ReactQuill value={formData.content}
                 theme='snow' 
                 placeholder='write on the line' 
                 className='h-72 ' 
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
    )
}

export default UpdateService