import React, { FC, memo } from "react";
import Button from "./Button";

interface Props {
  title: string;
  questions: number;
}

const Card: FC<Props> = ({ title, questions }) => {
  return (
    <div className="w-full p-4 mx-auto duration-100 rounded-md shadow-md md:w-1/3 hover:shadow-lg bg-gray-50">
      <div className="text-2xl font-bold text-center text-secondary-400">
        {title}
      </div>
      <div className="mt-5 font-semibold text-center text-secondary-400">
        {questions + " Questions"}
      </div>
      <Button className="block mx-auto mt-10">Start</Button>
    </div>
  );
};

Card.defaultProps = {};

export default memo(Card);
