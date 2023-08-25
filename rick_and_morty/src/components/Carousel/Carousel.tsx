import React from "react";
import classes from "./Carousel.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation, Mousewheel } from "swiper/modules";

type Props = {
  children: React.ReactNode[];
  swiperSlideClass: string;
};

export const Carousel: React.FC<Props> = ({ children, swiperSlideClass }) => {
  return (
    <div className={classes.carousel}>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        mousewheel={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={true}
        pagination={{
          type: "fraction",
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Mousewheel]}
        className={classes.swiper}
      >
        {children.map((child, index) => (
          <SwiperSlide key={index} className={swiperSlideClass}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
