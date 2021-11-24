import firebase from "firebase/compat";
import React, { FC, memo, useContext, useEffect, useState } from "react";
import QuestionCard from "../../components/Questions/QuestionCard";
import CommunitySkeletonLoaderList from "../../components/SkeletonLoaders/CommunitySkeletonLoaderList"
import { AuthContext } from "../../context/AuthContext";
import { firestore } from "../../firebase";

interface Props { }

const QuestionList: FC<Props> = (props) => {
     const user = useContext(AuthContext);
     const [loadingList, setLoadingList] = useState<boolean>(false);
     if (!sessionStorage.getItem("user") && user) {
          sessionStorage.setItem("user", user!.uid);
     }
     const [questionData, setQuestionData] = useState<
          firebase.firestore.DocumentData[]
     >([]);
     useEffect(() => {
          const fetchList = async () => {
               setLoadingList(true);
               await firestore
                    .collection("questions")
                    .where("uid", "!=", sessionStorage.getItem("user")!)
                    .get()
                    .then((questionList) => {
                         questionList.docs.forEach((question) => {
                              setQuestionData((prev) => [...prev, question.data()]);
                         });
                    })
                    .then(() => setLoadingList(false))
                    .catch((error) => {
                         console.log(error);
                    });
          };
          fetchList();
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);
     return (
          <>
               {!loadingList ? (
                    <div>
                         {" "}
                         {questionData.map((question) => {
                              return (
                                   <QuestionCard
                                        questionID={question.qid}
                                        tag={question.tag}
                                        key={question.qid}
                                   >
                                        {question.questionText}
                                   </QuestionCard>
                              );
                         })}{" "}
                    </div>
               ) : (
                    <CommunitySkeletonLoaderList page="questionList" />
               )}
          </>
     );
};

QuestionList.defaultProps = {};

export default memo(QuestionList);
