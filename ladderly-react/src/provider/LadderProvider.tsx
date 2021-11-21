import React, { FC, memo, ReactNode, useEffect, useState } from "react";
import { firestore } from "../firebase";
import firebase from "../firebase";
import { LadderContext } from "../context/LadderContext";

interface Props {
  children: ReactNode;
}

const LadderProvider: FC<Props> = ({ children }) => {
  const [ladders, setLadders] = useState<firebase.firestore.DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    const fetchLadders = async () => {
      await firestore
        .collection("ladders")
        .get()
        .then((ladderList) => {
          console.log("run");
          ladderList.docs.forEach((ladder) =>
            setLadders((prev) => [...prev, ladder.data()])
          );
        })
        .then(() => setLoading(false))
        .catch((err) => console.log(err));
    };
    fetchLadders();
  }, []);
  return (
    <>
      <LadderContext.Provider
        value={{
          data: ladders,
          loading: loading,
        }}
      >
        {children}
      </LadderContext.Provider>
    </>
  );
};

LadderProvider.defaultProps = {};

export default memo(LadderProvider);
