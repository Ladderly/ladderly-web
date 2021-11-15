import React, { FC, memo } from "react";
import CardList from "../../components/CardList";
import Carousel from "../../components/Carousel/Carousel";

interface Props {}

const Ladders: FC<Props> = (props) => {
  return (
    <div>
      <Carousel />
      <CardList />
    </div>
  );
};

Ladders.defaultProps = {};

export default memo(Ladders);
