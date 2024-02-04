import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../../modules/db";
import { Session } from "../../../types/models/models";

export const getUserDocument = async (userId: string) => {
  const userRef = doc(collection(db, "users"), userId);
  const userData = await getDoc(userRef);

  const previousSessionsRef = collection(
    doc(collection(db, "users"), userId),
    "previous_sessions"
  );

  // grab session history and sort by date
  const previousSessionsQuerySnapshot = await getDocs(query(previousSessionsRef, orderBy('timestamp', "desc")) );
  let session_history: Session[] = [];

    previousSessionsQuerySnapshot.forEach(doc => {
      const sessionData = doc.data() as Session;
      session_history.push(sessionData);
    });
  
    
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
