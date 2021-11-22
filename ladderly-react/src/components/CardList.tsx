import React, { FC, memo, useContext } from "react";
import Card from "./Card";
import { LadderContext } from "../context/LadderContext";
import CardSkeletonList from "./SkeletonLoaders/CardSkeletonList";

interface Props {}

const CardList: FC<Props> = (props) => {
  const { data, loading } = useContext(LadderContext);
  // console.log(data);
  // const [ladders, setLadders] = useState<firebase.firestore.DocumentData>();
  // useEffect(() => {
  //   const fetchLadders = () => {
  //     firestore
  //       .collection("ladders")
  //       .get()
  //       .then((ladderList) => {
  //         setLadders(ladderList.docs[0].data());
  //       });
  //   };
  //   fetchLadders();
  // }, []);
  return (
    <div className="mx-4 my-8">
      <h1 className="p-4 pb-12 font-serif text-3xl font-semibold text-center lg:text-5xl md:pt-20 md:pb-16 lg:pt-32 lg:pb-28 text-secondary-400">
        LADDERS
      </h1>
      {!loading ? (
        <Card
          link={data[0]?.lid}
          className="w-full md:w-1/3"
          title={data[0]?.title}
          questions={data[0]?.numberOfQuestions}
        />
      ) : (
        // <div> LOADING...... </div>
        <CardSkeletonList />
      )}
    </div>
  );
};

CardList.defaultProps = {};

export default memo(CardList);
