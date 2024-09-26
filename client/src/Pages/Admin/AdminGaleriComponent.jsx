import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../../redux/galeriSlice';
import Loading from '../../Components/Loading';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { getStorage, ref, deleteObject } from "firebase/storage"; // Import Firebase storage

function AdminGaleriComponent() {

    const { currentUser } = useSelector((state) => state.user);
    const [showModal, setShowModal] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);
  
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.images);
  
    useEffect(() => {
        dispatch(fetchImages());
    }, [dispatch]);
  
    if (loading) {
      return <Loading/>
    }
  
    if (error) {
      toast.error(error);
      return <div>Error: {error}</div>;
    }
  
    if (data.length === 0) {
      return <div>No service available</div>;
    }
  
    const handleDeleteImage = async () => {
      setShowModal(false);
      try {
        const res = await fetch(
          `/api/image/deleteimage/${imageToDelete._id}/${currentUser._id}`,
          {
            method: 'DELETE',
          }
        );
        const result = await res.json();
        
        if (!res.ok) {
          toast.error(result.message);
        } else {       
            dispatch(fetchImages());
            handleDeleteImageFirebase(imageToDelete.image);  // Pass image URL to Firebase deletion
        }
      } catch (error) {
        toast.error('Failed to delete image');
      }
    };
  
    const getFileNameFromUrl = (url) => {
      const decodedUrl = decodeURIComponent(url);
      const startIndex = decodedUrl.indexOf("/o/") + 3;
      const endIndex = decodedUrl.indexOf("?alt=media");
      return decodedUrl.substring(startIndex, endIndex);
    };
  
    const handleDeleteImageFirebase = async (imageUrl) => {
      try {
        const fileName = getFileNameFromUrl(imageUrl);
        const storage = getStorage();
        const imageRef = ref(storage, fileName);
  
        await deleteObject(imageRef);
        toast.success('Image deleted successfully from storage');
      } catch (error) {
        toast.error('Failed to delete image from storage');
        console.error(error);
      }
    };

    return (
      <div className='flex space-x-5'>
        {data?.images.map((image, index) => (
          <div key={index} className='border-2 relative group'>
            <button 
              onClick={() => {
                setShowModal(true);
                setImageToDelete(image); // Set the image object to delete
              }}
              className='w-8 h-8 text-xl bg-black rounded-full text-red-600 absolute -translate-y-1/2 -translate-x-1/2 top-[50%] left-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'
            >
              <MdDelete />
            </button>
            <img
              className='w-40 h-40 rounded-xl object-cover '
              src={image.image}
              alt=""
            />
          </div>
        ))}
        
        {showModal &&
          <div className='flex items-center justify-center rounded-lg p-2 absolute min-h-svh left-0 right-0 bottom-0 top-0 z-50 bg-black/50'>
            <div className='bg-gray-200 dark:bg-gray-500 p-20 relative rounded-lg border-4 border-black dark:border-white '>
              <button 
                className='text-red-600 bg-white rounded-full text-3xl absolute right-2 top-2' 
                onClick={() => setShowModal(false)}
              >
                <AiFillCloseCircle />
              </button>
              <div className='text-center'>
                <HiOutlineExclamationCircle className='h-14 w-14 text-yellow-500 dark:text-yellow-300 mb-4 mx-auto' />
                <h3 className='mb-5 text-lg dark:text-gray-100'>Delete Image?</h3>
                <div className='flex justify-center gap-4'>
                  <button 
                    className='bg-red-600 rounded-lg p-2 text-white font-sans font-bold' 
                    onClick={handleDeleteImage}
                  >
                    Delete
                  </button>
                  <button 
                    className='bg-sky-600 rounded-lg p-2 text-white font-sans font-bold' 
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
}

export default AdminGaleriComponent;
