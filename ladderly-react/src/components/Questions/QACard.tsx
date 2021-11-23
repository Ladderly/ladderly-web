import React, { FC, memo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Avatar from "../Avatar";
import { FiArrowDown } from "react-icons/fi";
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import Button from "../Button";
import { Link } from "react-router-dom";

interface Props {
  profile: string;
  title: string;
  resolver: string;
  answer: string;
  imgSrc?: string;
  questionID: string;
  userID: string;
}

const QACard: FC<Props> = ({
  title,
  resolver,
  answer,
  imgSrc,
  profile,
  questionID,
  userID,
}) => {
  const [readMore, setReadMore] = useState(false);
  const [visibility, setVisibility] = useState<boolean>(true);
  const [undoVisibility, setUndoVisibility] = useState<boolean>(false);
  const [toggleThumbsUp, setToggleThumbsUp] = useState<boolean>(false);
  const [toggleThumbsDown, setToggleThumbsDown] = useState<boolean>(false);
  return (
    <div className="relative bg-gray-100 shadow-lg">
      {visibility ? (
        <div>
          <div className="p-5 pb-0">
            <button>
              <IoMdClose
                onClick={() => {
                  setVisibility(false);
                  setUndoVisibility(true);
                }}
                className="absolute w-6 h-6 cursor-pointer right-2 top-2 text-secondary-400"
              />
            </button>
            <div className="flex items-center space-x-4">
              <Avatar src={profile} alt="profile-pic" size="small" />
              <Link to={`/profile/${userID}`}>
              <span
                className="font-semibold text-gray-700 cursor-pointer"
              >
                {resolver}
              </span>
              </Link>
            </div>
            <Link to={`/question/${questionID}`}>
            <h2
              className="my-4 text-lg font-semibold cursor-pointer hover:underline"
            >
              {title}
            </h2>
            </Link>
            {!readMore && (
              <div className="overflow-hidden whitespace-pre-wrap max-h-24">
                <p>{answer}</p>
              </div>
            )}
            {readMore && (
              <div className="whitespace-pre-wrap">
                <p>{answer}</p>
              </div>
            )}
            {!readMore && (
              <div>
                <button
                  onClick={() => setReadMore(!readMore)}
                  className="block mx-auto"
                >
                  <FiArrowDown className="w-6 h-6 text-secondary-400 animate-bounce" />
                </button>
              </div>
            )}
          </div>
          {imgSrc && (
            <img
              className="object-contain w-full h-full mt-4"
              src={imgSrc}
              alt="answer-context"
            />
          )}
          <div className="mt-4 border-b-2 border-secondary-400"></div>
          <div className="py-2 mx-6">
            <div className="flex items-center justify-between">
              <div className="flex px-4 py-2 space-x-3 border rounded-full w-28 border-secondary-400">
                <button
                  onClick={() => {
                    setToggleThumbsUp((prev) => !prev);
                    if (toggleThumbsDown) {
                      setToggleThumbsDown(false);
                    }
                  }}
                >
                  {!toggleThumbsUp ? (
                    <FaRegThumbsUp className="w-6 h-6 cursor-pointer text-secondary-400" />
                  ) : (
                    <FaThumbsUp className="w-6 h-6 cursor-pointer text-secondary-400" />
                  )}
                </button>
                <div className="border-r border-secondary-400"></div>
                <button
                  onClick={() => {
                    setToggleThumbsDown((prev) => !prev);
                    if (toggleThumbsUp) {
                      setToggleThumbsUp(false);
                    }
                  }}
                >
                  {!toggleThumbsDown ? (
                    <FaRegThumbsDown className="w-6 h-6 cursor-pointer text-secondary-400" />
                  ) : (
                    <FaThumbsDown className="w-6 h-6 text-red-500 cursor-pointer" />
                  )}
                </button>
              </div>
              <div>
                <button>
                  <IoMdShareAlt className="w-8 h-8 text-secondary-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        undoVisibility && (
          <div className="flex items-center justify-center py-20">
            <button>
              <IoMdClose
                onClick={() => setUndoVisibility(false)}
                className="absolute w-6 h-6 cursor-pointer right-2 top-2 text-secondary-400"
              />
            </button>
            <Button onClick={() => setVisibility(true)}>Undo</Button>
          </div>
        )
      )}
    </div>
  );
};

QACard.defaultProps = {};

export default memo(QACard);
