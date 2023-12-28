import { Question } from "../../../types/models/Questions";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../modules/db";

// * Send new questions to DB
export const setQuestionDoc = async (
  topic: string,
  difficulty: string,
  questionArray: Question[]
) => {
  questionArray.forEach(async question => {
    try {
      const dataRef = doc(
        collection(doc(collection(db, "questions"), topic), difficulty)
      );

      question.question_id = dataRef.id;

      await setDoc(dataRef, question);
    } catch (error) {
      console.error("Error happened in setQuestionDoc", error);
    }
  });
};
