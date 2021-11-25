import React, { FC, memo, useState } from "react";
import { IoMdClose, IoMdShareAlt } from "react-icons/io";
import Button from "../Button";
import { AiFillTags } from "react-icons/ai";
import { Link } from "react-router-dom";

interface Props {
  children: string;
  questionID: string;
  tag: string;
}

const QuestionCard: FC<Props> = ({ children, tag, questionID }) => {
  const [visibility, setVisibility] = useState<boolean>(true);
  const [undoVisibility, setUndoVisibility] = useState<boolean>(false);
  return (
    <>
      <div className="w-full px-2 sm:w-2/5 sm:px-0 sm:mx-auto">
        <div className="relative mt-4 bg-gray-100 shadow-lg">
          {visibility ? (
            <div className="px-5 pt-3">
              <h2 className="text-lg font-semibold">{children}</h2>
              <button>
                <IoMdClose
                  onClick={() => {
                    setVisibility(false);
                    setUndoVisibility(true);
                  }}
                  className="absolute w-6 h-6 cursor-pointer right-2 top-2 text-secondary-400"
                />
              </button>
              <div className="flex items-center mt-4 space-x-2">
                <AiFillTags className="w-6 h-6 text-secondary-400" />
                <p className="text-sm font-semibold text-secondary-400">
                  {tag}
                </p>
              </div>

              <div className="mt-4 border-b-2 border-secondary-400"></div>
              <div className="flex items-center justify-between py-2 mx-6">
                <Link to={`/community/question/${questionID}`}>
                  <Button>Answer</Button>
                </Link>
                <button>
                  <IoMdShareAlt className="w-8 h-8 text-secondary-400" />
                </button>
              </div>
            </div>
          ) : (
            undoVisibility && (
              <div className="flex items-center justify-center py-10">
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
      </div>
    </>
  );
};

QuestionCard.defaultProps = {};

export default memo(QuestionCard);
