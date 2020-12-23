import React, { ReactElement, useContext, useState, useEffect } from "react";
import { auth, db, storage, googleProvider } from "../utils/firebase";

import { v4 as uuid } from "uuid";

interface Props {
  children: ReactElement[] | ReactElement;
}

const AuthContext = React.createContext<any>({});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: Props): ReactElement {
  const [currentUser, setCurrentUser] = useState<any>(null);

  const usersRef = db.collection("users");
  const storageRef = storage.ref();
  // const usersStorgaeRef = storageRef.child("users");

  const signUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await usersRef.doc(user?.uid).set({
      id: user?.uid,
      firstName,
      lastName,
      email,
    });
  };

  const signUpWithGoogle = async () => {
    const { user } = await auth.signInWithPopup(googleProvider);
    await usersRef.doc(user?.uid).set({
      id: user?.uid,
      firstName: user?.displayName?.split(" ")[0],
      lastName: user?.displayName?.split(" ")[1],
      email: user?.email,
      photo: user?.photoURL,
    });
  };

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await usersRef.doc(user?.uid).get();
        const userDetails = userDoc.data();
        setCurrentUser(userDetails);
      }
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    login,
    logout,
    signUpWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
