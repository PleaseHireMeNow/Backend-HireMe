import { Question } from "../../types/models/Questions";
import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../modules/db";
import { gptSendPrompt } from "../../modules/openai";
import { User } from '../../types/models/Questions'

export const getNestedDocument = async (
  collectionName: string,
  topic: string,
  difficulty: string
) => {
  try {
    // * testing set questions to DB!!
    // ! disabled so it doesn't send 20 Q's to DB!
    // setQuestionDoc("questions", "JavaScript", "entry-level", questions);

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

    // const result = await gptSendPrompt("React", "mid-level", [], 3);

    // return result.choices[0].message.content;
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

export const getUsersInfo = async () => {
  const usersInfoRef = collection(db, 'users');
  let userList: User[] = [];
  try {
  const usersSnapshot = await getDocs(usersInfoRef);

    usersSnapshot.forEach(doc => {
      const userData = doc.data() as User;
      userList.push(userData)
    })
    return userList;
  } finally { 
  }
}

// * Get questions flow
// get questions from DB
// compare to user - see what has been looked at
// send 10 questions to the user
// update users list of questions in DB
// if not enough questions (less than 20) - get more Q's from GPT
// SET new Q's in questions DB

// * AI needs
// Get a list of questions (tech stack & level)

// Give to prompt
// from DB
// Topic
// Difficulty
// List of questions in DB
