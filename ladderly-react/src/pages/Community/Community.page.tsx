import React, { FC, memo } from "react";

interface Props {}

const Community: FC<Props> = (props) => {
  return <div>Community</div>;
};

Community.defaultProps = {};

export default memo(Community);
