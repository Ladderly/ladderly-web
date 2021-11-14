import React, { FC, memo } from "react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./Carousel.css";
import HeroSection from "./CarouselItems/HeroSection";

interface Props {}

SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);
const Carousel: FC<Props> = (props) => {
  return (
    <>
      <Swiper
        effect={"fade"}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        navigation={true}
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
