import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import { ServiceData } from "./index";

const ActiveSlider = () => {
  return (
    <div className="flex items-center justify-center min-h-[450px] flex-col mt-12 mb-12 sm:h-full">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 15,
            centeredSlides: true,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 15,
            centeredSlides: false,
          },

          1100: {
            slidesPerView: 3,
            spaceBetween: 15,
            centeredSlides: false,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-full lg:max-w-[80%] swiper-container"
      >
        {ServiceData.map((item) => (
          <SwiperSlide key={item.title} className="swiper-slide">
            <div className="flex flex-col justify-start items-start mb-20 group relative shadow-lg text-stone-800 rounded-xl px-6 py-8 h-[400px] w-[310px] overflow-hidden dark:text-white">
              <div className="absolute inset-0  bg-stone-50 dark:bg-stone-900" />
              <div className="absolute inset-0 " />
              <div className="relative flex flex-col justify-center items-center gap-3 w-full">
                <div className="text-stone-800 self-start text-2xl font-semibold group-hover:opacity-90 dark:text-white">
                  {item.number}
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-2 mt-8  w-[220px]">
                  <item.icon className="text-stone-800 group-hover:text-stone-700 w-[84px] h-[84px] dark:text-white dark:group-hover:text-zinc-400" />
                  <h1 className="text-xl lg:text-2xl font-bold group-hover:opacity-80">
                    {item.title}
                  </h1>
                  <p className="lg:text-[16px] group-hover:opacity-90">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ActiveSlider;
