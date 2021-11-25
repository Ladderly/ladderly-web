import React, { FC, memo } from "react";

interface Props {
  page: "questionList" | "home";
}

const CommunitySkeletonLoader: FC<Props> = ({ page }) => {
  return (
    <div className="bg-gray-100">
      <div className="p-5 pb-0">
        {page === "home" && (
          <div className="flex items-center my-4 space-x-4 animate-pulse">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="w-24 h-6 bg-gray-300 rounded-full"></div>
          </div>
        )}
        <div className="w-4/6 h-6 mt-3 mb-6 bg-gray-300 rounded-full"></div>
        {page === "home" && (
          <>
            <div className="w-full h-4 my-2 bg-gray-300 rounded-full"></div>
            <div className="w-full h-4 my-2 bg-gray-300 rounded-full"></div>
            <div className="w-full h-4 my-2 bg-gray-300 rounded-full"></div>
            <div className="w-full h-4 my-2 bg-gray-300 rounded-full"></div>
          </>
        )}
        {page === "questionList" && (
          <>
            <div className="flex items-center mt-10 mb-3 space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
            </div>
          </>
        )}
        <div className="flex items-center justify-between py-4 border-t border-gray-300">
          <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

CommunitySkeletonLoader.defaultProps = {};

export default memo(CommunitySkeletonLoader);
