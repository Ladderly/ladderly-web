import React, { FC, memo, useContext, useState } from "react";
import { AiFillTags } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useHistory, useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { firestore } from "../../firebase";
import Button from "../Button";

interface Props {
  children: string;
  questionID: string;
  tag: string;
}

const ProfileQuestionCard: FC<Props> = ({ children, questionID, tag }) => {
  const { userID } = useParams<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useContext(AuthContext);
  if (!sessionStorage.getItem("user") && user) {
    sessionStorage.setItem("user", user!.uid);
  }
  const history = useHistory();
  const [deleteModel, setDeleteModel] = useState<boolean>(false);
  const deleteQuestion = async () => {
    try {
      firestore
        .collection("questions")
        .doc(questionID)
        .delete()
        .then(() => {
          setLoading(false);
          window.location.reload();
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="relative w-full p-5 mt-4 bg-gray-100 shadow-md">
      {!deleteModel ? (
        <>
          <span
            onClick={() => history.push(`/question/${questionID}`)}
            className="text-lg font-semibold cursor-pointer sm:text-xl hover:underline"
          >
            {children}
          </span>
          {userID === sessionStorage.getItem("user")! && (
            <button>
              <MdDelete
                onClick={() => {
                  setDeleteModel(true);
                }}
                className="absolute w-6 h-6 text-red-500 cursor-pointer right-2 top-2"
              />
            </button>
          )}
          <div className="flex items-center mt-8 space-x-2">
            <AiFillTags className="w-6 h-6 text-secondary-400" />
            <p className="text-sm font-semibold text-secondary-400">{tag}</p>
          </div>
        </>
      ) : (
        <>
          <p className="font-semibold text-center sm:text-lg text-secondary-400">
            Question will be deleted permanently
          </p>
          <div className="flex items-center justify-center mt-6 space-x-8">
            <Button onClick={() => setDeleteModel(false)}>Undo</Button>
            <Button
              className="w-20"
              loading={loading}
              theme="warning"
              onClick={() => {
                setLoading(true);
                deleteQuestion();
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

ProfileQuestionCard.defaultProps = {};

export default memo(ProfileQuestionCard);
