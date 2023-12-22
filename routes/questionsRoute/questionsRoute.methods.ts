import { Question } from "../../types/models/Questions";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../modules/db";
import questions from "../../testing/db/question.json";

export const getNestedDocument = async (
  collectionName: string,
  topic: string,
  difficulty: string
) => {
  try {
    // testing set data to DB!!

    setQuestionDoc("questions", "JavaScript", "entry-level", questions);

    const questionCollectionRef = collection(
      doc(collection(db, collectionName), topic),
      difficulty
    );

    const collectionSnapshot = await getDocs(questionCollectionRef);
    let questionCollection: Question[] = [];
    collectionSnapshot.forEach(doc => {
      console.log(doc.id);
      const questionData = doc.data() as Question;
      questionData.question_id = doc.id;
      questionCollection.push(questionData);
    });

    return questionCollection;
  } catch (error) {
    console.error("Error getting collection:", error);
    throw error; // Propagate the error
  }
};

const setQuestionDoc = async (
  collectionName: string,
  topic: string,
  difficulty: string,
  questionArray: Question[]
) => {
  questionArray.forEach(async question => {
    try {
      await setDoc(
        doc(collection(doc(collection(db, collectionName), topic), difficulty)),
        question
      );
    } catch (error) {
      console.error("Error happened in setQuestionDoc", error);
    } 
  });
};


// * Get questions flow
// get questions from DB
// compare to user - see what has been looked at
// if not enough questions - get more Q's from GPT
  // <20 -- get Q's from GPT
// return bundle of questions (to DB)
// GET to Frontend set of Q's
