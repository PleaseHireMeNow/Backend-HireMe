import { Answer, AnswerHistory, Question, Session } from "../../../types/models/Questions";
import { collection, doc, getDoc, getDocs, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../modules/db";

export const postAnswerHistory = async (
  userId: string,
  answer: Answer,
  question: Question,
  session_id: string
) => {
  try {
    const userHistoryRef = doc(collection(doc(collection(db, 'users'), userId), 'history'), question.question_id);
    const userHistory = await getDoc(userHistoryRef);
    let userHistoryData = {
      question_id: question.question_id,
      question_content: question.question_content,
      answered_correctly: 0,
      answered_incorrectly: 0,
      responses: [
        {
          timestamp: Timestamp.fromDate(new Date()),
          response: {
            answer: answer
          },
          session_id
        }
      ]
    }
    if (userHistory.data() !== undefined) {
      userHistoryData = userHistory.data() as AnswerHistory
      userHistoryData.responses.push({
        timestamp: Timestamp.fromDate(new Date()),
        response: {
          answer: answer
        },
        session_id
      });

    }
    if (answer.is_correct) {
      userHistoryData.answered_correctly++;
    } else {
      userHistoryData.answered_incorrectly++;
    }
    await setDoc(userHistoryRef, userHistoryData)
  } catch (err) {
    console.error("I dunno, there was an error.", err)
  }
  addAnswerToCurrentSession(userId, answer)
}

const addAnswerToCurrentSession = async (
  userId: string,
  answer: Answer
) => {
  // add answer to current session
  // create reference for current session
  const currentSessionRef = collection(doc(collection(db, 'users'), userId), 'current_session');
  const currentSessionCollectionSnapshot = await getDocs(currentSessionRef)
  const currentSessionDocumentRef = doc(currentSessionRef, currentSessionCollectionSnapshot.docs[0].id)
  const currentSessionDocumentSnapshot = await getCurrentSessionDocumentSnapshot(userId)
  const currentSessionDocument = currentSessionDocumentSnapshot.data() as Session
  // update questioncontent in current session
  await setDoc(currentSessionDocumentRef, { current_question: currentSessionDocument.current_question + 1 }, { merge: true });
  answer.is_correct && await setDoc(currentSessionDocumentRef, { answered_correctly: currentSessionDocument.answered_correctly || 1 }, { merge: true });
  console.log(currentSessionDocument.current_question)
}

export const getCurrentSessionDocumentSnapshot = async (userId: string) => {
  const currentSessionRef = collection(doc(collection(db, 'users'), userId), 'current_session');
  const currentSessionCollectionSnapshot = await getDocs(currentSessionRef)
  const currentSessionDocumentRef = doc(currentSessionRef, currentSessionCollectionSnapshot.docs[0].id)
  const currentSessionDocumentSnapshot = await getDoc(currentSessionDocumentRef)
  return currentSessionDocumentSnapshot;
}