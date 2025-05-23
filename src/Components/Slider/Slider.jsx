import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './slider.css';

// Import required modules
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

const Slider = ({ heroImagesData }) => {
    return (
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            pagination={true}
            autoplay={{
                delay: 2500, // milliseconds between slides
                disableOnInteraction: false, // keeps autoplay even after user interaction
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper"
        >
            {
                heroImagesData.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image.Image_URL} alt={`Slide ${index}`} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default Slider;
