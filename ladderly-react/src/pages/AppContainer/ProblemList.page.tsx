import React, { FC, memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase";
import firebase from "../../firebase";
import { IoIosArrowDown } from "react-icons/io";

interface Props {}

const ProblemList: FC<Props> = (props) => {
  const { ladderID } = useParams<any>();
  const { topic } = useParams<any>();
  const [problems, setProblems] = useState<firebase.firestore.DocumentData[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    // console.log(topic);
    const fetchProblems = () => {
      setLoading(true);
      firestore
        .collection(`ladder_${ladderID}`)
        .where("topic", "==", topic)
        .get()
        .then((problemList) => {
          problemList.forEach((problem) => {
            setProblems((prev) => [...prev, problem.data()]);
          });
        })
        .then(() => {
          console.log(problems);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    fetchProblems(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="px-5 pb-5">
      {!loading ? (
        <div className="w-full sm:w-2/3 sm:mx-auto">
          {problems.map((problem, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between w-full p-4 my-4 bg-gray-100 rounded-sm shadow-md"
              >
                <p
                  onClick={() => window.open(problem.url, "_blank")}
                  className="w-5/6 font-semibold text-left cursor-pointer hover:underline text-secondary-400"
                >
                  {problem.questionText}
                </p>
                <IoIosArrowDown className="w-6 h-6 cursor-pointer text-secondary-400" />
              </div>
            );
          })}
        </div>
      ) : (
        <div>LOADING.....</div>
      )}
    </div>
  );
};

ProblemList.defaultProps = {};

export default memo(ProblemList);
