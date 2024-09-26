import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../../redux/galeriSlice';
import Loading from '../../Components/Loading';
import { toast } from 'react-toastify';
import ImageSlider from '../../Components/ImageSlider';

function Galeri() {
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
    return <div>Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div>No images available</div>;
  }

  // "16/9" ve "3/4" kategorilerine göre görüntüleri filtreleyin
  const category16_9 = data.images.filter((image) => image.category === '16/9');
  const category3_4 = data.images.filter((image) => image.category === '3/4');

  return (
    <div className='min-h-screen flex flex-col p-5 space-y-5'>

<div className='w-full rounded-xl'>

<ImageSlider images={data.images} />

</div>

<div className='w-full flex flex-wrap items-center justify-between  gap-5 '>
{
  data?.images.map((image,index)=>(
<div key={index}
 className='max-w-[500px] max-sm:w-full sm:h-[300px] overflow-hidden'>
<img 
src={image.image} 
alt=""
 className='max-w-[500px] max-sm:w-full sm:h-[300px] rounded-xl '/>
</div>
  ))
}
</div>


    </div>
  );
}

export default Galeri;


{/*
  <div className='w-full flex'>
      
      <div className='w-1/2  border flex flex-col items-center  space-y-2'>
        
        {category16_9.length > 0 ? (
          category16_9.map((image, index) => (
            <div key={index} className='w-full h-[352px] '>
              <img
                src={image.image}
                alt=""
                className='w-full h-full object-cover rounded-lg'
              />
            </div>
          ))
        ) : (
          <p>No images in this category</p>
        )}
      </div>

     
      <div className='w-1/2  border flex flex-col items-center '>
       
        <div className='flex flex-wrap space-y-2'>
        {category3_4.length > 0 ? (
          category3_4.map((image, index) => (
            <div key={index} className='w-[600px] h-[708px]    '>
              <img
                src={image.image}
                alt=""
                className='w-[600px] h-full object-cover rounded-lg'
              />
            </div>
          ))
        ) : (
          <p>No images in this category</p>
        )}
        </div>
      </div>

      </div>
  */}