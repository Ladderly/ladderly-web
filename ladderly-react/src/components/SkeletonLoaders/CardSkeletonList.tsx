import React, { FC, memo } from "react";
import CardSkeleton from "./CardSkeleton";

interface Props {}

const CardSkeletonList: FC<Props> = (props) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};

CardSkeletonList.defaultProps = {};

export default memo(CardSkeletonList);
