import React, { FC, memo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Avatar from "../Avatar";
import { FiArrowDown } from "react-icons/fi";
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaThumbsUp,
  FaThumbsDown,
  FaRegComment,
} from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import profile from "../../assets/img/anonymous.jpg";

interface Props {
  resolver: string;
  answer: string;
  imgSrc?: string;
}

const AnswerCard: FC<Props> = ({ resolver, answer, imgSrc }) => {
  const [readMore, setReadMore] = useState(false);
  const [toggleThumbsUp, setToggleThumbsUp] = useState<boolean>(false);
  const [toggleThumbsDown, setToggleThumbsDown] = useState<boolean>(false);
  return (
    <div className="relative bg-gray-100 shadow-lg">
      <div className="p-5">
        <div className="flex items-center space-x-4">
          <Avatar src={profile} alt="profile-pic" size="small" />
          <span className="font-semibold text-gray-700">{resolver}</span>
        </div>
        <button>
          <IoMdClose className="absolute w-6 h-6 cursor-pointer right-2 top-2 text-secondary-400" />
        </button>
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
      </div>
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
          <div className="flex items-center space-x-4">
            <button>
              <FaRegComment className="w-6 h-6 rounded-sm text-secondary-400" />
            </button>
            <button>
              <IoMdShareAlt className="w-8 h-8 rounded-full text-secondary-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

AnswerCard.defaultProps = {};

export default memo(AnswerCard);
