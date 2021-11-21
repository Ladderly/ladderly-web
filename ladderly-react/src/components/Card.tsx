import React, { FC, memo } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "./Button";

interface Props {
  title: string;
  questions: number;
  className?: string;
  link?: string;
  topicLink?: string;
}

const Card: FC<Props> = ({ title, questions, className, link, topicLink }) => {
  const { ladderID } = useParams<any>();
  return (
    <div
      className={`p-4 mx-auto duration-100 rounded-md shadow-md hover:shadow-lg bg-gray-50 ${className}`}
    >
      <div className="text-lg font-bold text-center md:text-2xl text-secondary-400">
        {title}
      </div>
      <div className="mt-5 font-semibold text-center text-secondary-400">
        {questions + " Questions"}
      </div>
      {link ? (
        <Link to={`/ladders/${link}`}>
          <Button className="block mx-auto mt-10">Start</Button>
        </Link>
      ) : topicLink ? (
        <Link to={`/ladders/${ladderID}/${topicLink}`}>
          <Button className="block mx-auto mt-10">Start</Button>
        </Link>
      ) : (
        <Button className="block mx-auto mt-10">Start</Button>
      )}
    </div>
  );
};

Card.defaultProps = {
  className: "",
};

export default memo(Card);
