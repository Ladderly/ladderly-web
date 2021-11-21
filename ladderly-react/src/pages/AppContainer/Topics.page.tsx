import React, { FC, memo, useContext } from "react";
import Card from "../../components/Card";
import { LadderContext } from "../../context/LadderContext";

interface Props {}

const Topics: FC<Props> = (props) => {
  // const [topics, setTopics] = useState<firebase.firestore.DocumentData>({});
  const { data, loading } = useContext(LadderContext);
  // useEffect(() => {
  //   const fetchData = () => {
  //     firestore
  //       .collection("ladders")
  //       .get()
  //       .then((ladderList) => {
  //         setTopics({ ...ladderList.docs[0].data().topics });
  //       })
  //       .catch((err) => console.log(err));
  //   };
  //   fetchData();
  //   //eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return (
    <div className="grid grid-cols-12 gap-2 p-5 rounded-md sm:space-x-0 sm:gap-4 sm:p-3">
      {!loading && data[0] !== undefined ? (
        Object.keys(data[0].topics).map((keyName, keyIndex) => {
          return (
            <Card
              key={keyIndex}
              title={keyName}
              questions={data[0].topics[keyName]}
              className="w-full col-span-12 sm:col-span-6 lg:col-span-4"
              topicLink={keyName}
            />
          );
        })
      ) : (
        <div>LOADING.........</div>
      )}
    </div>
  );
};

Topics.defaultProps = {};

export default memo(Topics);
