import { createContext } from "react";
import firebase from "../firebase";

export const AuthContext = createContext<firebase.User | null>(null);