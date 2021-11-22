import React, { FC, memo } from "react";
import QuestionSkeleton from "./QuestionSkeleton";

interface Props {}

const QuestionSkeletonList: FC<Props> = (props) => {
  return (
    <div className="flex flex-col space-y-4">
      <QuestionSkeleton />
      <QuestionSkeleton />
      <QuestionSkeleton />
      <QuestionSkeleton />
      <QuestionSkeleton />
      <QuestionSkeleton />
      <QuestionSkeleton />
      <QuestionSkeleton />
      <QuestionSkeleton />
      <QuestionSkeleton />
    </div>
  );
};

QuestionSkeletonList.defaultProps = {};

export default memo(QuestionSkeletonList);
