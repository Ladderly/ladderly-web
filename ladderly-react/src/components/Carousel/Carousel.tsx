import React, { FC, memo } from "react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./Carousel.css";
import HeroSection from "./CarouselItems/HeroSection";

interface Props {}

SwiperCore.use([Pagination, Autoplay]);
const Carousel: FC<Props> = (props) => {
  return (
    <>
      <Swiper
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        pagination={{ clickable: true }}
        tag="section"
        id="main"
      >
        <SwiperSlide>
          <HeroSection icon="ladder" />
        </SwiperSlide>
        <SwiperSlide>
          <HeroSection icon="custom" />
        </SwiperSlide>
        <SwiperSlide>
          <HeroSection icon="community" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

Carousel.defaultProps = {};

export default memo(Carousel);
