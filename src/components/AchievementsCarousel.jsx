import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import { Fancybox } from "@fancyapps/ui";
import VideoModal from './VideoModal';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const AchievementsCarousel = ({ mediaContent }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoModal, setVideoModal] = useState({ isOpen: false, url: '', title: '' });
  const swiperRef = useRef(null);

  // Initialize Fancybox
  React.useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      // Custom options
    });

    return () => {
      Fancybox.destroy();
    };
  }, []);

  const handleVideoClick = (videoUrl, videoTitle) => {
    setVideoModal({ isOpen: true, url: videoUrl, title: videoTitle });
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleCloseVideo = () => {
    setVideoModal({ isOpen: false, url: '', title: '' });
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  const renderMedia = (item) => {
    if (item.type === 'video') {
      const thumbnailUrl = item.source === 'youtube' 
        ? `https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`
        : '/images/video-thumbnail.jpg'; // Add a default thumbnail for Drive videos

      const videoUrl = item.source === 'youtube'
        ? `https://www.youtube.com/embed/${item.videoId}`
        : `https://drive.google.com/file/d/${item.fileId}/preview`;

      return (
        <div 
          className="relative w-full h-full cursor-pointer group"
          onClick={() => handleVideoClick(videoUrl, item.title)}
        >
          <img
            src={thumbnailUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg 
              className="w-20 h-20 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      );
    }
    
    return (
      <a
        data-fancybox="gallery"
        href={item.url}
        className="block w-full h-full"
      >
        <img
          src={item.url}
          alt={item.title}
          className="w-full h-full object-contain"
        />
      </a>
    );
  };

  return (
    <>
      <div className="achievements-carousel relative">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, EffectFade, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          effect="fade"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
            if (swiper.autoplay && !videoModal.isOpen) {
              swiper.autoplay.start();
            }
          }}
          className="w-full aspect-[16/9]"
        >
          {mediaContent.map((item, index) => (
            <SwiperSlide key={index} className="bg-black">
              <div className="w-full h-full flex items-center justify-center">
                {renderMedia(item)}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {mediaContent[activeIndex]?.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 z-10">
            <h3 className="text-lg font-semibold">{mediaContent[activeIndex].title}</h3>
            {mediaContent[activeIndex].description && (
              <p className="text-sm opacity-80">{mediaContent[activeIndex].description}</p>
            )}
          </div>
        )}
      </div>

      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={handleCloseVideo}
        videoUrl={videoModal.url}
        videoTitle={videoModal.title}
      />
    </>
  );
};

export default AchievementsCarousel;
