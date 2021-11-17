import React, { FC, memo } from "react";
import Button from "./Button";

interface Props {
  title: string;
  questions: number;
  className?: string;
}

const Card: FC<Props> = ({ title, questions, className }) => {
  return (
    <div
      className={`p-4 mx-auto duration-100 rounded-md shadow-md hover:shadow-lg bg-gray-50 ${className}`}
    >
      <div className="text-lg md:text-2xl font-bold text-center text-secondary-400">
        {title}
      </div>
      <div className="mt-5 font-semibold text-center text-secondary-400">
        {questions + " Questions"}
      </div>
      <Button className="block mx-auto mt-10">Start</Button>
    </div>
  );
};

Card.defaultProps = {
  className: "",
};

export default memo(Card);
