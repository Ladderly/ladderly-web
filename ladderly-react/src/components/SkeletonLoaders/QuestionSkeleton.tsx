import React, { FC, memo } from "react";

interface Props {}

const QuestionSkeleton: FC<Props> = (props) => {
  return (
    <div className="flex justify-between w-3/5 p-4 mx-auto rounded-md shadow-md bg-gray-50">
      <div className="w-3/5 h-6 bg-gray-200 rounded-full animate-pulse"></div>
      <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
    </div>
  );
};

QuestionSkeleton.defaultProps = {};

export default memo(QuestionSkeleton);
