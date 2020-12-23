import React, { ReactElement, useContext, useState, useEffect } from "react";
import { db, storage } from "../utils/firebase";

import { v4 as uuid } from "uuid";

interface Props {
  children: ReactElement[] | ReactElement;
}

const UserContext = React.createContext<any>({});

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }: Props): ReactElement {
  const usersRef = db.collection("users");

  const getUserbyId = async (id: string) => {
    const userDoc = await usersRef.doc(id).get();
    if (userDoc.exists) {
      const userDetails = userDoc.data();
      return userDetails;
    } else return null;
  };

  const value = { getUserbyId };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
