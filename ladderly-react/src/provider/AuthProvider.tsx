import React, { FC, memo, ReactNode, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import firebase, { auth } from "../firebase";

interface Props {
  children: ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [currentUser]);

  return (
    <>
    <AuthContext.Provider value={currentUser}>
      {children}
    </AuthContext.Provider>
  </>
  );
};

AuthProvider.defaultProps = {};

export default memo(AuthProvider);
