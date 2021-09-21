import React, { FC, memo, useRef } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./Carousel.css";
import HeroSection from "./CarouselItems/HeroSection";

interface Props {}

SwiperCore.use([Navigation, Pagination]);
const Carousel: FC<Props> = (props) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Swiper
        slidesPerView={1}
        navigation={{
          prevEl: prevRef.current!, // Assert non-null
          nextEl: nextRef.current!, // Assert non-null
        }}
        pagination={{ clickable: true }}
        tag="section"
        id="main"
      >
        <SwiperSlide>
          <HeroSection />
        </SwiperSlide>
        <SwiperSlide>
          <HeroSection />
        </SwiperSlide>
        <SwiperSlide>
          <HeroSection />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

Carousel.defaultProps = {};

export default memo(Carousel);
