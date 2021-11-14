import React, { FC, memo } from "react";
import hero_section from "../../../img/hero-section.png";

interface Props {}

const HeroSection: FC<Props> = (props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto md:flex-row">
      <div className="flex-1 mb-10 ml-0 text-3xl font-black sm:text-5xl md:ml-40 md:text-4xl lg:text-5xl xl:text-6xl">
        <h1 className="text-secondary-300">Our Ladders</h1>
        <h1 className="text-gray-600 ">have got</h1>
        <h1 className="text-gray-600 ">
          you <span className="text-secondary-300">covered.</span>
        </h1>
      </div>
      <div className="flex-1">
        <img
          className="object-cover w-full sm:h-1/2"
          src={hero_section}
          alt="ladder"
        />
      </div>
    </div>
  );
};

HeroSection.defaultProps = {};

export default memo(HeroSection);
