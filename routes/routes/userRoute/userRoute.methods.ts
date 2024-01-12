import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../modules/db";
import { Session } from "../../../types/models/models";

export const getUserDocument = async (userId: string) => {
  const userRef = doc(collection(db, "users"), userId);
  const userData = await getDoc(userRef);

  const previousSessionsRef = collection(
    doc(collection(db, "users"), userId),
    "previous_sessions"
  );

  const previousSessionsQuerySnapshot = await getDocs(previousSessionsRef);
  let session_history: Session[] = [];

  
  // ? updated logic will only try to grab previous sessions if they exist!
  // ? curious if the if statement is relevant here? if there's nothing in docs, nothing happens 🤷🏻‍♂️
  if (previousSessionsQuerySnapshot.docs[0] !== undefined) {
    previousSessionsQuerySnapshot.forEach(doc => {
      const sessionData = doc.data() as Session;
      session_history.push(sessionData);
    });

    // ! want to test reversing - how is the array returning by default?
    // session_history.reverse()
  }

    const currentSessionRef = collection(
      doc(collection(db, "users"), userId),
      "current_session"
    );

    const currentSessionQuerySnapshot = await getDocs(currentSessionRef);
    let current_session = currentSessionQuerySnapshot.docs[0].data();

    return {
      user: userData.data(),
      session_history: session_history,
      current_session: current_session,
    };
};
