import React, { FC, memo } from "react";

interface Props {}

const AppContainer: FC<Props> = (props) => {
  return <div>App</div>;
};

AppContainer.defaultProps = {};

export default memo(AppContainer);
