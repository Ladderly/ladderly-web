import React, { FC, memo } from "react";
import CommunitySkeletonLoader from "./CommunitySkeletonLoader";

interface Props {
  page: "questionList" | "home";
}

const CommunitySkeletonLoaderList: FC<Props> = ({ page }) => {
  return (
    <div className="flex flex-col w-full px-2 mt-6 space-y-4 sm:w-2/5 sm:mx-auto sm:px-0">
      <CommunitySkeletonLoader page={page} />
      <CommunitySkeletonLoader page={page} />
      <CommunitySkeletonLoader page={page} />
      <CommunitySkeletonLoader page={page} />
    </div>
  );
};

CommunitySkeletonLoaderList.defaultProps = {};

export default memo(CommunitySkeletonLoaderList);
