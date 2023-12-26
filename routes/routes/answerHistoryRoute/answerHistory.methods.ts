import { Answer, AnswerHistory, Question } from "../../../types/models/Questions";
import { collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../modules/db";

export const postAnswerHistory = async (
  userid: string,
  answer: Answer,
  question: Question,
) => {
  try {
    const userHistoryRef = doc(collection(doc(collection(db, 'users'), userid), 'history'), question.question_id);
    const userHistory = await getDoc(userHistoryRef);
    if (userHistory.data() === undefined) {
      let userHistoryData = {
        question_content: question.question_content,
        answered_correctly: 0,
        answered_incorrectly: 0,
        responses: [
          {
            timestamp: Timestamp.fromDate(new Date()),
            response: {
              answer: answer
            }
          }
        ]
      }
      if (answer.is_correct) {
        userHistoryData.answered_correctly++;
      } else {
        userHistoryData.answered_incorrectly++;
      }
      await setDoc(userHistoryRef, userHistoryData)
    } else {
      const userHistoryData = userHistory.data() as AnswerHistory
      userHistoryData.responses.push({
        timestamp: Timestamp.fromDate(new Date()),
        response: {
          answer: answer
        }
      });
      if (answer.is_correct) {
        userHistoryData.answered_correctly++;
      } else {
        userHistoryData.answered_incorrectly++;
      }
      await setDoc(userHistoryRef, userHistoryData)
    }

  } catch (err) {
    console.error("I dunno, there was an error.", err)
  }
}