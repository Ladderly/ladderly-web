import React, { FC, Fragment, memo, useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import { Tab } from "@headlessui/react";
import firebase from "firebase/compat/app";
import { firestore } from "../../firebase";
import { FaEdit } from "react-icons/fa";
import ProfileQuestionCard from "../../components/Questions/ProfileQuestionCard";
import ProfileAnswerCard from "../../components/Answers/ProfileAnswerCard";
import { useParams } from "react-router-dom";
import ProfileSkeletonLoader from "../../components/SkeletonLoaders/ProfileSkeletonLoader";
import profile from "../../assets/img/anonymous.jpg";

interface Props {}

const Profile: FC<Props> = (props) => {
  const { userID } = useParams<any>();
  const [userName, setUserName] = useState<string>();
  const [questionData, setQuestionData] = useState<
    firebase.firestore.DocumentData[]
  >([]);
  const [answers, setAnswers] = useState<firebase.firestore.DocumentData[]>([]);
  const [loadingQuestionList, setQuestionLoadingList] =
    useState<boolean>(false);
  const [loadingAnswerList, setLoadingAnswerList] = useState<boolean>(false);
  useEffect(() => {
    const fetchQuestions = async () => {
      setQuestionLoadingList(true);
      await firestore
        .collection("questions")
        .where("uid", "==", userID)
        .get()
        .then((questionList) => {
          questionList.docs.forEach((question) => {
            setQuestionData((prev) => [...prev, question.data()]);
          });
        })
        .then(() => setQuestionLoadingList(false))
        .catch((error) => {
          console.log(error);
        });
    };
    const fetchUser = async () => {
      try {
        await firestore
          .collection("users")
          .where("uid", "==", userID)
          .get()
          .then((userList) => setUserName(userList.docs[0].data().displayName));
      } catch (err) {
        console.log(err);
      }
    };
    const fetchAnswers = async () => {
      try {
        setLoadingAnswerList(true);
        await firestore
          .collection("answers")
          .where("uid", "==", userID)
          .get()
          .then((answerList) => {
            answerList.docs.forEach((answer) => {
              setAnswers((prev) => [...prev, answer.data()]);
            });
          })
          .then(() => setLoadingAnswerList(false));
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
    fetchQuestions();
    fetchAnswers(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full rounded-md shadow-md sm:w-3/5 sm:mx-auto bg-gray-50">
      <div className="p-5">
        <div className="flex items-center space-x-5">
          {!loadingQuestionList ? (
            <div className="relative">
              <Avatar size="large" src={profile} alt="profile-pic" />
              <FaEdit className="absolute p-1 border-2 rounded-full cursor-pointer w-7 h-7 bottom-1 right-2 border-secondary-400 text-secondary-400" />
            </div>
          ) : (
            <div className="w-40 h-40 bg-gray-300 rounded-full animate-pulse"></div>
          )}
          {!loadingQuestionList ? (
            <p className="text-xl font-bold sm:text-4xl ">{userName}</p>
          ) : (
            <div className="w-48 h-8 bg-gray-300 rounded-full animate-pulse"></div>
          )}
        </div>
        <Tab.Group>
          <Tab.List className="flex justify-around w-full mt-10 mb-2">
            <Tab as={Fragment}>
              {({ selected }) => (
                <div
                  className={
                    selected
                      ? "text-secondary-400 border-b-2 border-secondary-400 font-bold cursor-pointer text-lg"
                      : " text-black font-bold cursor-pointer text-lg"
                  }
                >
                  Questions
                </div>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <div
                  className={
                    selected
                      ? "text-secondary-400 border-b-2 border-secondary-400 font-bold cursor-pointer text-lg"
                      : " text-black font-bold cursor-pointer text-lg"
                  }
                >
                  Answers
                </div>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              {!loadingQuestionList ? (
                <>
                  {questionData.length !== 0 ? (
                    questionData.map((question) => {
                      return (
                        <ProfileQuestionCard
                          questionID={question.qid}
                          tag={question.tag}
                          key={question.qid}
                        >
                          {question.questionText}
                        </ProfileQuestionCard>
                      );
                    })
                  ) : (
                    <div className="my-20 text-xl font-semibold text-center text-secondary-400">
                      Sorry, there are no questions to display
                    </div>
                  )}
                </>
              ) : (
                <ProfileSkeletonLoader page="questionList" />
              )}
            </Tab.Panel>
            <Tab.Panel>
              {!loadingAnswerList ? (
                <>
                  {answers.length !== 0 ? (
                    answers.map((answer, index) => {
                      return (
                        <ProfileAnswerCard
                          key={index}
                          answer={answer.answerText}
                          imgSrc={answer.imageLink}
                          created={answer.created}
                          questionID={answer.qid}
                          answerID={answer.aid}
                          fileName={answer.fileName}
                        ></ProfileAnswerCard>
                      );
                    })
                  ) : (
                    <div className="my-20 text-xl font-semibold text-center text-secondary-400">
                      Sorry, there are no answers to display
                    </div>
                  )}
                </>
              ) : (
                <ProfileSkeletonLoader page="answers" />
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

Profile.defaultProps = {};

export default memo(Profile);
