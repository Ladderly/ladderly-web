import React, { FC, memo, useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import firebase from "firebase/compat/app";
import { firestore, storage } from "../../firebase";
import { useHistory } from "react-router";
import Button from "../Button";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface Props {
  answer: string;
  imgSrc?: string;
  created: firebase.firestore.Timestamp;
  questionID: string;
  answerID: string;
  fileName: string;
}

const ProfileAnswerCard: FC<Props> = ({
  answer,
  imgSrc,
  created,
  questionID,
  answerID,
  fileName,
}) => {
  const history = useHistory();
  const { userID } = useParams<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useContext(AuthContext);
  if (!sessionStorage.getItem("user") && user) {
    sessionStorage.setItem("user", user!.uid);
  }
  const [question, setQuestion] = useState<string>("");
  const [deleteModel, setDeleteModel] = useState<boolean>(false);
  useEffect(() => {
    const findQuestion = async () => {
      try {
        await firestore
          .collection("questions")
          .where("qid", "==", questionID)
          .get()
          .then((questionlist) => {
            console.log("run1");
            setQuestion(questionlist.docs[0].data().questionText);
          });
      } catch (err) {
        console.log(err);
      }
    };
    findQuestion(); //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const deleteAnswer = async () => {
    try {
      await firestore
        .collection("answers")
        .doc(answerID)
        .delete()
        .then(() => {
          firestore
            .collection("questions")
            .doc(questionID)
            .update({
              numberOfAnswers: firebase.firestore.FieldValue.increment(-1),
            })
            .then(() => {
              storage
                .ref("files")
                .child(fileName)
                .delete()
                .then(() => window.location.reload())
                .catch((err) => {
                  setLoading(false);
                  window.location.reload();
                  console.log(err);
                });
            });
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="relative w-full p-5 mt-4 bg-gray-100 shadow-md">
      {!deleteModel ? (
        <>
          <p className="text-sm font-semibold text-secondary-400">
            {new Date(created.seconds * 1000).toLocaleDateString("en-US")}
          </p>
          <p
            onClick={() => history.push(`/question/${questionID}`)}
            className="mt-4 font-semibold cursor-pointer hover:underline"
          >
            {question}
          </p>
          <p className="mt-6">{answer}</p>
          {userID === sessionStorage.getItem("user")! && (
            <button>
              <MdDelete
                onClick={() => setDeleteModel(true)}
                className="absolute w-6 h-6 text-red-500 cursor-pointer right-2 top-2"
              />
            </button>
          )}
          {imgSrc && (
            <img
              className="object-contain w-full h-full mt-4"
              src={imgSrc}
              alt="answer-context"
            />
          )}
        </>
      ) : (
        <>
          <p className="font-semibold text-center sm:text-lg text-secondary-400">
            Answer will be deleted permanently
          </p>
          <div className="flex items-center justify-center mt-6 space-x-8">
            <Button onClick={() => setDeleteModel(false)}>Undo</Button>
            <Button
              className="w-20"
              loading={loading}
              theme="warning"
              onClick={() => {
                setLoading(true);
                deleteAnswer();
              }}
            >
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

ProfileAnswerCard.defaultProps = {};

export default memo(ProfileAnswerCard);
