import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

function ImageSlider({ images }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
      className="w-full h-[600px]  rounded-xl"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="w-full h-full rounded-xl">
            <img
            loading='lazy'
              src={image.image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ImageSlider;
