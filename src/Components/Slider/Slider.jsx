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
    console.log(heroImagesData);
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
                delay: 2500,
                disableOnInteraction: false,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper"
        >
            {
                heroImagesData.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="relative min-h-screen flex justify-center items-center text-white overflow-hidden"
                            style={{
                                backgroundImage: `url(${image.Image_URL})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                          

                            <div className="relative z-10 flex bg-[#00000050] flex-col items-center justify-center h-full text-center px-4">
                                <h1 className="text-xl md:text-2xl font-extrabold tracking-widest uppercase font-[Orbitron]">
                                    {
                                        image.Group_Name
                                    }
                                </h1>
                                <p className="text-base tracking-widest mt-2 uppercase text-gray-400">
                                  {
                                    image.Meeting_Location
                                  }
                                </p>

                                <p className="max-w-xl mt-6 text-gray-300">
                                   {
                                    image.Description
                                   }
                                    </p>


                            </div>


                        </div>


                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default Slider;
