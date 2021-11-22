import React, { FC, memo } from "react";

interface Props {}

const CardSkeleton: FC<Props> = (props) => {
  return (
    <div className="w-full col-span-12 rounded-md shadow-md sm:col-span-6 lg:col-span-4 bg-gray-50">
      <div className="w-5/6 h-8 mx-auto my-3 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="w-3/5 h-6 mx-auto mb-6 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="w-10 h-6 mx-auto mb-3 bg-gray-200 rounded-full animate-pulse"></div>
    </div>
  );
};

CardSkeleton.defaultProps = {};

export default memo(CardSkeleton);
