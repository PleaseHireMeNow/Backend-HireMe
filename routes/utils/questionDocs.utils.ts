import { Question } from "../../types/models/models";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../modules/db";

export const getQuestionDocuments = async (
  topic: string,
  difficulty: string
) => {
  try {
    const questionCollectionRef = collection(
      doc(collection(db, "questions"), topic),
      difficulty
    );

    const collectionSnapshot = await getDocs(questionCollectionRef);
    let questionCollection: Question[] = [];

    collectionSnapshot.forEach(doc => {
      const questionData = doc.data() as Question;
      questionCollection.push(questionData);
    });

    // return result.choices[0].message.content;
    return questionCollection;
  } catch (error) {
    console.error("Error getting collection:", error);
    throw error; // Propagate the error
  }
};
