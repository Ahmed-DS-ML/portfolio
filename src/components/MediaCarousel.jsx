import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const MediaCarousel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const mediaItems = [
    {
      type: 'image',
      src: '/images/achievements/Production-Dashboard.jpg',
      title: 'Production Dashboard',
      description: 'Interactive dashboard showing production metrics and KPIs'
    },
    {
      type: 'video',
      src: 'https://drive.google.com/file/d/1ca6uvoff53L7ZG4VA4I8R8DYfPvFti22/preview',
      title: 'Report Cycle Time',
      description: 'Video demonstration of cycle time analysis'
    },
    {
      type: 'image',
      src: '/images/achievements/Dr-Saleh.jpg',
      title: 'Meeting with Dr. Saleh',
      description: 'Professional development discussion'
    },
    {
      type: 'image',
      src: '/images/achievements/Eng-Ahmed Ashraf.jpg',
      title: 'Collaboration with Eng. Ahmed Ashraf',
      description: 'Project planning and execution'
    },
    // Add more media items as needed
  ];

  const openModal = (media) => {
    setSelectedMedia(media);
    setIsOpen(true);
  };

  return (
    <div className="relative py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          My Achievements
        </h2>
        
        <Swiper
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
          className="h-[600px] w-full rounded-xl shadow-lg"
        >
          {mediaItems.map((item, index) => (
            <SwiperSlide key={index} className="bg-white">
              <div className="relative h-full w-full cursor-pointer group"
                   onClick={() => openModal(item)}>
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={item.src}
                    className="w-full h-full"
                    allow="autoplay"
                    allowFullScreen
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-200">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Transition show={isOpen} as={Fragment}>
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="inline-block w-full max-w-7xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <div className="absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {selectedMedia && (
                    <div className="mt-2">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 mb-4"
                      >
                        {selectedMedia.title}
                      </Dialog.Title>
                      <div className="aspect-w-16 aspect-h-9">
                        {selectedMedia.type === 'image' ? (
                          <img
                            src={selectedMedia.src}
                            alt={selectedMedia.title}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <iframe
                            src={selectedMedia.src}
                            className="w-full h-full"
                            allow="autoplay"
                            allowFullScreen
                          />
                        )}
                      </div>
                      <p className="mt-4 text-gray-600">{selectedMedia.description}</p>
                    </div>
                  )}
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default MediaCarousel;
