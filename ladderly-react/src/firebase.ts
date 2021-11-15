import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2Ze1YiQWiYtrpA12BTwfqDBwTCMC-_f4",
  authDomain: "ladderly-3ff7a.firebaseapp.com",
  projectId: "ladderly-3ff7a",
  storageBucket: "ladderly-3ff7a.appspot.com",
  messagingSenderId: "237572627598",
  appId: "1:237572627598:web:df367e9a21f4934b767ddf",
  measurementId: "G-E79HGHBDJC",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
export const storage = firebaseApp.storage();

export default firebase;
