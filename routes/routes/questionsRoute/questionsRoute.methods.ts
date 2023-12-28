import { AnswerHistory, Question } from "../../../types/models/Questions";
import { collection, doc, getDocs, getDoc, setDoc, addDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../modules/db";
import { gptSendPrompt } from "../../../modules/openai";
import { User } from "../../../types/models/Questions";
import questions from "../../../testing/db/question.json";

export const getQuestionDocuments = async (
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
      const questionData = doc.data() as Question;
      questionCollection.push(questionData);
    });

    // * testing GPT get question data!
    // ! disabled to not constantly ping GPT
    // ! SETUP YOUR OWN GPT ACCOUNT AND ADD YOUR KEY TO .env AS: "OPENAI_API_KEY"
    // const result = await gptSendPrompt("React", "mid-level", [], 3);

    // return result.choices[0].message.content;
    return questionCollection;
  } catch (error) {
    console.error("Error getting collection:", error);
    throw error; // Propagate the error
  }
};

// * Send new questions to DB
const setQuestionDoc = async (
  collectionName: string,
  topic: string,
  difficulty: string,
  questionArray: Question[]
) => {
  questionArray.forEach(async question => {
    try {
      const dataRef = doc(
        collection(doc(collection(db, collectionName), topic), difficulty)
      );

      question.question_id = dataRef.id;

      await setDoc(dataRef, question);
    } catch (error) {
      console.error("Error happened in setQuestionDoc", error);
    }
  });
};

export const getUsersInfo = async () => {
  const usersInfoRef = collection(db, "users");
  let userList: User[] = [];
  try {
    const usersSnapshot = await getDocs(usersInfoRef);

    usersSnapshot.forEach(doc => {
      const userData = doc.data() as User;
      userList.push(userData);
    });
    return userList;
  } finally {
  }
};

const getQuestionHistory = async (user: User) => {

  const userHistoryRef = collection(
    doc(collection(db, "users"), user.user_id),
    "history"
  );

  const historySnapshot = await getDocs(userHistoryRef);

  let answeredQuestionIds: string[] = [];

  historySnapshot.forEach(answeredQuestion => {
    const data = answeredQuestion.data() as AnswerHistory;
    console.log("questionId is: ", answeredQuestion.id);
    console.log(data);
  });

  // console.log(userHistoryRef);
  // console.log(historySnapshot);

  // return userQuestionHistory;
};

export const compareQuestionLists = (
  allQuestions: Question[],
  user: User
) => {
  // console.log(userid);
  getQuestionHistory(user);

  // const userQuestionHistory = user.history

  // allQuestions.forEach((question) => {
  //   userQuestionHistory.some((historyQuestion) => {
  //     question.question_id === historyQuestion.

  //   })
};

export const createNewSession = async (
  numberOfQuestions: number,
  topic: string,
  difficulty: string,
  userId: string
) => {
  // get number of questions from the db
  const allQuestions = await getQuestionDocuments("questions", topic, difficulty);
  const sessionQuestions = allQuestions.slice(0, numberOfQuestions);
  // get the existing current session
  const currentSessionRef = collection(
    doc(collection(db, 'users'), userId),
    'current_session'
  );
  const currentSessionExistingSnapshot = await getDocs(currentSessionRef);
  // save the existing current session to previous sessions
  const previousSessionsRef = collection(doc(collection(db, 'users'), userId), 'previous_sessions');
  // send the questions to the database
  if (currentSessionExistingSnapshot.docs.length > 0) {
    await addDoc(previousSessionsRef, currentSessionExistingSnapshot.docs[0].data())
    await deleteDoc(doc(currentSessionRef, currentSessionExistingSnapshot.docs[0].id))
  }
  await addDoc(currentSessionRef, {
    questions: sessionQuestions,
    timestamp: Timestamp.fromDate(new Date()),
    current_question: 0
  })
  // return the set of questions
  return {questions: sessionQuestions, current_question: 0}
}

export const getExistingSession = async (
  userId: string
) => {
  // get existing session data
  const currentSessionRef = collection(
    doc(collection(db, 'users'), userId),
    'current_session'
  );
  const currentSessionExisting = await getDocs(currentSessionRef);
  return currentSessionExisting.docs[0].data();
}

// * Get questions flow
// ✅ get questions from DB
// get userHistory from DB
// compare to user - see what has been looked at
// -- grab all incorrectly answered & unanswered questions
// send 10 questions to the user
// ✅ ADD to current session
// ✅ update users list of questions in DB
// if not enough questions (less than 20) - get more Q's from GPT
// SET new Q's in questions DB

// * AI needs
// Get a list of questions (tech stack & level)

// Give to prompt
// from DB
// Topic
// Difficulty
// List of questions in DB

// * update answers
// ✅ update user answer history
// update current session current_question property
// update got answer right/wrong in history + current session
