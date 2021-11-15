import React, { FC, memo } from "react";
import { ReactComponent as Custom } from "../../../assets/svg/customization.svg";
import { ReactComponent as Ladder } from "../../../assets/svg/ladder.svg";
import { ReactComponent as Community } from "../../../assets/svg/community.svg";

interface Props {
  icon: "ladder" | "custom" | "community";
}

const HeroSection: FC<Props> = ({ icon }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto md:flex-row">
      <div className="flex-1 p-12 mx-auto text-3xl font-black md:mb-10 md:p-0 sm:text-5xl md:ml-40 md:text-4xl lg:text-5xl xl:text-6xl">
        {icon === "custom" && (
          <>
            <h1 className="text-secondary-300">Customize</h1>
            <h1 className="text-gray-600 ">ladders</h1>
            <h1 className="text-gray-600 ">
              according to your{" "}
              <span className="text-secondary-300">need.</span>
            </h1>
          </>
        )}
        {icon === "ladder" && (
          <>
            <h1 className="text-secondary-300">Our ladders</h1>
            <h1 className="text-gray-600 ">have got</h1>
            <h1 className="text-gray-600 ">
              you <span className="text-secondary-300">covered.</span>
            </h1>
          </>
        )}
        {icon === "community" && (
          <>
            <h1 className="text-gray-600">Join our</h1>
            <h1 className="text-secondary-300">Community</h1>
            <h1 className="text-gray-600 ">
              to help others and get your doubts{" "}
              <span className="text-secondary-300">cleared.</span>
            </h1>
          </>
        )}
      </div>
      <div className="flex-1 w-full p-12">
        {icon === "custom" ? (
          <Custom className="w-4/5 mx-auto h-4/5 sm:h-1/2" />
        ) : icon === "ladder" ? (
          <Ladder className="w-4/5 mx-auto h-4/5 sm:h-1/2" />
        ) : (
          <Community className="w-4/5 mx-auto h-4/5 sm:h-1/2" />
        )}
      </div>
    </div>
  );
};

HeroSection.defaultProps = {};

export default memo(HeroSection);
