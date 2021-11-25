import { FC, memo, useEffect, useState } from "react";
import AddQuestionModal from "../../components/Questions/AddQuestionModel";
import QACard from "../../components/Questions/QACard";
import firebase from "firebase/compat/app";
import { firestore } from "../../firebase";
import CommunitySkeletonLoaderList from "../../components/SkeletonLoaders/CommunitySkeletonLoaderList";
import profile from "../../assets/img/anonymous.jpg";

interface Props {}

const Home: FC<Props> = (props) => {
  const [answers, setAnswers] = useState<firebase.firestore.DocumentData[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(false);
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setLoadingList(true);
        await firestore
          .collection("answers")
          .get()
          .then((answerList) => {
            answerList.docs.forEach((answer) => {
              console.log("run");
              setAnswers((prev) => [...prev, answer.data()]);
            });
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchAnswers().then(() => setLoadingList(false));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {!loadingList ? (
        <div>
          <div className="flex flex-col w-full px-2 mt-6 space-y-4 sm:w-2/5 sm:mx-auto sm:px-0">
            {answers.map((answer, index) => {
              return (
                <QACard
                  profile={profile}
                  title={answer.questionText}
                  key={index}
                  resolver={answer.userName}
                  answer={answer.answerText}
                  imgSrc={answer.imageLink}
                  questionID={answer.qid}
                  userID={answer.uid}
                ></QACard>
              );
            })}
          </div>
          <AddQuestionModal />
        </div>
      ) : (
        <CommunitySkeletonLoaderList page="home" />
      )}
    </>
  );
};

Home.defaultProps = {};

export default memo(Home);
