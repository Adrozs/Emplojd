import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import { ServiceData } from "./index";

const ActiveSlider = () => {
  return (
    <div className="flex items-center justify-center flex-col h-[400px] my-12">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1100: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[90%] lg:max-w-[92%]"
      >
        {ServiceData.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="flex flex-col justify-start items-start gap-6 mb-20 group relative shadow-lg text-stone-800 rounded-xl px-6 py-8 h-[400px] w-[260px]  overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center bg-stone-50" />
              <div className="absolute inset-0 " />
              <div className="relative flex flex-col justify-center items-center gap-3">
                <div className="text-stone-800 self-start text-2xl font-semibold group-hover:opacity-90">
                  {item.number}
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-2 mt-8 mx-auto w-[210px]">
                  <item.icon className="text-stone-800 group-hover:text-stone-700 w-[84px] h-[84px]" />
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
