import { createContext } from "react";
import firebase from "../firebase";

export const LadderContext = createContext<{
  data: firebase.firestore.DocumentData[];
  loading: boolean;
}>({
  data: [],
  loading: false,
});
