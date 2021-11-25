import { Disclosure } from "@headlessui/react";
import { Alert, TextField } from "@mui/material";
import {
  ChangeEvent,
  Fragment,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoMdShareAlt } from "react-icons/io";
import Button from "../../components/Button";
import { FaPenAlt } from "react-icons/fa";
import { BsFillImageFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import firebase from "firebase/compat";
import { firestore, storage } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import AnswerCard from "../../components/Answers/AnswerCard";
import CommunitySkeletonLoaderList from "../../components/SkeletonLoaders/CommunitySkeletonLoaderList";

interface Props {}

const Question: React.FC<Props> = (props) => {
  const inputRef = useRef<any>(null);
  const user = useContext(AuthContext);
  const { questionID } = useParams<any>();
  const [image, setImage] = useState<any>(null);
  const [numOfAnswers, setNumOfAnswers] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<firebase.firestore.DocumentData[]>([]);
  const [loadingList, setLoadingList] = useState<boolean>(false);
  const [alertVisibility, setAlertVisibility] = useState<boolean>(false);
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setLoadingList(true);
        await firestore
          .collection("answers")
          .where("qid", "==", questionID)
          .get()
          .then((answerList) => {
            answerList.docs.forEach((answer) => {
              console.log("run");
              setAnswers((prev) => [...prev, answer.data()]);
            });
          })
          .then(() => setLoadingList(false));
      } catch (err) {
        console.log(err);
      }
    };
    const getQuestionData = async () => {
      try {
        await firestore
          .collection("questions")
          .where("qid", "==", questionID)
          .get()
          .then((questionlist) => {
            setQuestion(questionlist.docs[0].data().questionText);
            setNumOfAnswers(questionlist.docs[0].data().numberOfAnswers);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getQuestionData();
    fetchAnswers().then(() => setAlertVisibility(true)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0]);
  };
  const uploadAnswer = async (url: string = "", fileName: string = "") => {
    await firestore
      .collection("answers")
      .add({
        answerText: answer,
        qid: questionID,
        created: firebase.firestore.Timestamp.now(),
        uid: user?.uid,
        userName: user?.displayName,
        questionText: question,
        imageLink: url,
        fileName: fileName,
      })
      .then((res) => {
        res.update({
          aid: res.id,
        });
      })
      .then(() => {
        firestore
          .collection("questions")
          .doc(questionID)
          .update({
            numberOfAnswers: firebase.firestore.FieldValue.increment(1),
          })
          .then(() => {
            setLoading(false);
            window.location.reload();
            setAnswer("");
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };
  const uploadImage = (file: any) => {
    const uploadTask = storage.ref(`files/${file.name}`).put(file);
    uploadTask.on(
      "stage_changed",
      (snapshot) => {},
      (error) => console.log(error),
      () => {
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            uploadAnswer(url, file.name);
            console.log(url);
          });
      }
    );
  };
  const addAnswer = () => {
    setLoading(true);
    image ? uploadImage(image) : uploadAnswer();
  };
  return (
    <>
      {!loadingList ? (
        <div className="flex flex-col w-full px-2 mt-6 space-y-4 sm:px-0 sm:w-2/5 sm:mx-auto">
          <div className="relative flex flex-col bg-gray-100 shadow-lg">
            {alertVisibility && !user && (
              <Alert
                onClose={() => setAlertVisibility(false)}
                severity="warning"
                className="absolute left-0 right-0 mx-auto text-center transition duration-1000 ease-in-out -top-12 sm:-top-8 w-80 sm:w-96"
              >
                Kindly Sign In to Answer Questions!
              </Alert>
            )}
            <h1 className="items-center p-5 text-xl font-semibold h-15">
              {question}
            </h1>
            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
              ref={inputRef}
            />
            <Disclosure as={Fragment}>
              <Disclosure.Button as={Fragment}>
                <button className="block mr-auto">
                  <FaPenAlt className="w-10 h-10 p-2 ml-4 border rounded-full border-secondary-400 text-secondary-300" />{" "}
                </button>
              </Disclosure.Button>
              <Disclosure.Panel as={Fragment}>
                {({ close }) => (
                  <div className="mt-5 ml-4 mr-4 transform ">
                    <TextField
                      onChange={handleAnswerChange}
                      value={answer}
                      className="w-full"
                      id="outlined-multiline-static"
                      label="Enter Answer"
                      multiline
                      rows={4}
                      placeholder="Please enter appropriate answer.."
                      color="success"
                    />
                    <div className="flex justify-end mt-2 space-x-2">
                      <BsFillImageFill className="w-6 h-6 text-secondary-400" />
                      <button
                        onClick={() => inputRef.current.click()}
                        className="text-sm font-semibold text-secondary-400"
                      >
                        Add image
                      </button>
                    </div>
                    <Button
                      loading={loading}
                      disabled={answer && user ? false : true}
                      onClick={() => {
                        addAnswer();
                      }}
                      className="block w-32 mt-4 mr-auto"
                    >
                      Add Answer
                    </Button>
                  </div>
                )}
              </Disclosure.Panel>
            </Disclosure>
            <div className="mt-4 border-b-2 border-secondary-400"></div>
            <div className="py-2 mx-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{numOfAnswers} ANSWERS</p>
                <div>
                  <button>
                    <IoMdShareAlt className="w-8 h-8 text-secondary-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            {answers.map((answer, index) => {
              return (
                <AnswerCard
                  key={index}
                  resolver={answer.userName}
                  answer={answer.answerText}
                  imgSrc={answer.imageLink}
                ></AnswerCard>
              );
            })}
          </div>
        </div>
      ) : (
        <CommunitySkeletonLoaderList page="home" />
      )}
    </>
  );
};
Question.defaultProps = {};
export default memo(Question);
