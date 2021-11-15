import React, { FC, memo } from "react";
import Card from "./Card";

interface Props {}

const CardList: FC<Props> = (props) => {
  return (
    <div className="mx-4 my-8">
      <h1 className="p-4 pb-12 font-serif text-3xl font-semibold text-center lg:text-5xl md:pt-20 md:pb-16 lg:pt-32 lg:pb-28 text-secondary-400">
        LADDERS
      </h1>
      <Card className="w-full md:w-1/3" title="Love Babbar" questions={450} />
    </div>
  );
};

CardList.defaultProps = {};

export default memo(CardList);
