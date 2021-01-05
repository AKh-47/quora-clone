import React, { ReactElement, useContext, useState } from "react";
import { db } from "../utils/firebase";
import firebase from "firebase";

import { useAuth } from "./AuthContext";
import { useUser } from "./UserContext";

interface Props {
  children: ReactElement[] | ReactElement;
}

const QuestionContext = React.createContext<any>({});

export function useQuestions() {
  return useContext(QuestionContext);
}

const questionsRef = db.collection("questions");
const answersRef = db.collection("answers");

const increment = firebase.firestore.FieldValue.increment(1);
const decrement = firebase.firestore.FieldValue.increment(-1);

export default function QuestionProvider({ children }: Props): ReactElement {
  const { currentUser } = useAuth();
  const { getUserbyId } = useUser();

  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const querySnapshot = await questionsRef
      // .orderBy("dateCreated")
      .get();
    const data: any = [];
    querySnapshot.forEach(async (doc) => {
      const docData = doc.data();

      let { user } = docData;

      // const userData = await getUserbyId(user);
      // data.push({ ...docData, user: userData, id: doc.id });

      // getUserbyId(user).then((userData) => {
      //   data.push({ ...docData, user: userData, id: doc.id });
      // });

      data.push({ ...docData, id: doc.id });
    });

    data.reverse();
    console.log(data);

    setQuestions(data);
  };

  const postQuestion = async (ques: string) => {
    await questionsRef.add({
      text: ques,
      user: currentUser.id,
      upvotes: 0,
    });
  };

  //Same user can upvote multiple times, fix
  const upvote = (type: "question" | "answer", id: string, undo = false) => {
    if (type === "question") {
      questionsRef.doc(id).update({ upvotes: undo ? decrement : increment });
    } else {
      answersRef.doc(id).update({ upvotes: undo ? decrement : increment });
    }
  };

  const downwote = (type: "question" | "answer", id: string, undo = false) => {
    if (type === "question") {
      questionsRef.doc(id).update({ downvotes: undo ? decrement : increment });
    } else {
      answersRef.doc(id).update({ downvotes: undo ? decrement : increment });
    }
  };

  const postAnswer = (ques: string, ans: string) => {
    answersRef.add({
      question: ques,
      text: ans,
      user: currentUser.uid,
      upvotes: 0,
      dateCreated: Date.now(),
      downvotes: 0,
    });
  };

  const value = {
    postQuestion,
    postAnswer,
    questions,
    fetchQuestions,
    upvote,
    downwote,
  };

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
}
