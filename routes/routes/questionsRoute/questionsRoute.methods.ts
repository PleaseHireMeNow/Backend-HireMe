import {
  AnswerHistory,
  NewSessionResponse,
  Question,
  Session,
  SessionQuestion,
} from "../../../types/models/models";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  Timestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../modules/db";
import { User } from "../../../types/models/models";
import { getQuestionDocuments } from "../../utils/questionDocs.utils";
import { gptSendPrompt } from "../../../modules/openai";

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

const getQuestionHistory = async (userId: string) => {
  const userHistoryRef = collection(
    doc(collection(db, "users"), userId),
    "history"
  );

  const historySnapshot = await getDocs(userHistoryRef);

  let answeredQuestions: AnswerHistory[] = [];

  historySnapshot.forEach(answeredQuestion => {
    answeredQuestions.push(answeredQuestion.data() as AnswerHistory);
  });

  // console.log(answeredQuestions);

  return answeredQuestions;
};

export const compareQuestionLists = async (
  topic: string,
  difficulty: string,
  userId: string,
  numberOfQuestions: number
) => {
  // get number of questions from the db
  let allQuestions = await getQuestionDocuments(topic, difficulty);

  if (allQuestions.length < 10) {
    const numberToGrab = 10 - allQuestions.length;

    console.log("\nNo questions for:", topic, difficulty);
    // console.log('getting a quick 10 from GPT');
    console.time("invokeGptTime"); // start the timer
    await invokeGpt(topic, difficulty, numberToGrab);
    console.timeEnd("invokeGptTime"); // end the timer & log the time
    // console.log('done getting 10 from GPT\n');

    allQuestions = await getQuestionDocuments(topic, difficulty);
  }

  console.log(topic, difficulty, "questions:", allQuestions.length);

  // gets questionHistory from user DB
  const userAnsweredQuestions = await getQuestionHistory(userId);

  console.log("allQuestions length is:", allQuestions.length);
  // console.log("allQuestions is:", allQuestions);
  console.log("userAnsweredQuestions length is:", userAnsweredQuestions.length);
  // console.log("userAnsweredQuestions is:", userAnsweredQuestions);

  let questionList: SessionQuestion[] = [];

  // compare questions and find 10 new questions from list of allQuestions
  allQuestions.forEach(question => {
    // If answer_history exists compare, else add all questions to list
    if (
      userAnsweredQuestions.some(historyQuestion => {
        const matchingQuestionId =
          question.question_id !== historyQuestion.question_id;
        const moreWrong =
          historyQuestion.answered_incorrectly >=
          historyQuestion.answered_correctly;

        return matchingQuestionId || moreWrong;
      })
    ) {
      // this runs if there is AT LEAST 1 item in the answer history
      questionList.push({ question });
    } else {
      // this only runs if there is NOTHING in the answer history
      questionList.push({ question });
    }
  });

  // console.log('questionList is: ', questionList);
  console.log("questionList length is: ", questionList.length);

  // set list of ~10~ question
  const sessionQuestionList = questionList.slice(0, numberOfQuestions);

  // check if we need more questions
  const needMoreQuestionsFlag = questionList.length <= 20;

  // build a session object
  const sessionObject: Session = {
    current_question: 0,
    answered_correctly: 0,
    timestamp: Timestamp.fromDate(new Date()),
    questions: sessionQuestionList,
  };

  return { sessionObject, needMoreQuestionsFlag };
  // return { sessionQuestionList, needMoreQuestionsFlag, current_question: 0 };
};

export const createNewSessionResponse = async (
  numberOfQuestions: number,
  topic: string,
  difficulty: string,
  userId: string
) => {
  // compare questions, return list of unanswered questions
  let sessionResponse: NewSessionResponse = await compareQuestionLists(topic, difficulty, userId, numberOfQuestions);

  return await createNewSession(sessionResponse, userId) as NewSessionResponse;
};

export const createNewSession = async (sessionResponse: NewSessionResponse, userId: string) => {
  // get the existing current session reference
  const currentSessionCollectionRef = collection(
    doc(collection(db, "users"), userId),
    "current_session"
  );
  // get the existing current session
  const currentSessionExistingSnapshot = await getDocs(
    currentSessionCollectionRef
  );

  // get the previous session reference
  const previousSessionsRef = collection(
    doc(collection(db, "users"), userId),
    "previous_sessions"
  );

  // save the existing current session to previous sessions, delete from current session
  if (currentSessionExistingSnapshot.docs.length > 0) {
    await addDoc(
      previousSessionsRef,
      currentSessionExistingSnapshot.docs[0].data()
    );
    await deleteDoc(
      doc(
        currentSessionCollectionRef,
        currentSessionExistingSnapshot.docs[0].id
      )
    );
  }

  // grab current session document reference
  const currentSessionDocRef = doc(currentSessionCollectionRef);

  // update session_id & sessionObject with results from compareQuestionLists
  sessionResponse.sessionObject.session_id = currentSessionDocRef.id;
  const currentSession = sessionResponse.sessionObject;

  // set the new session document in database
  await setDoc(currentSessionDocRef, currentSession);

  // return the set of questions to frontend
  return sessionResponse;
};

export const getExistingCurrentSession = async (userId: string) => {
  // get existing session data
  const currentSessionRef = collection(
    doc(collection(db, "users"), userId),
    "current_session"
  );
  const currentSessionExisting = await getDocs(currentSessionRef);
  return currentSessionExisting.docs[0].data() as Session;
};

export const getExistingPreviousSession = async (userId: string, sessionId: string) => {
  // get previous session data
  const previousSessionRef = doc(collection(
    doc(collection(db, "users"), userId),
    "previous_sessions"), sessionId);

  const previousSessionExisting = await getDoc(previousSessionRef);
  return previousSessionExisting.data() as Session;
};

export const deleteExistingPreviousSession = async (userId: string, sessionId: string) => {
  // get previous session data
  const previousSessionRef = doc(collection(
    doc(collection(db, "users"), userId),
    "previous_sessions"), sessionId);

    await deleteDoc(previousSessionRef)
}


export const invokeGpt = async (
  topic: string,
  difficulty: string,
  numberOfQuestions: number
) => {
  console.log("GPT invoked!");
  // Get list of questions under topic->difficulty as REF for GPT prompt
  const allQuestions = await getQuestionDocuments(topic, difficulty);
  const allQuestionsContentText: string[] = [];

  // map questions text only
  allQuestions.map(question => {
    allQuestionsContentText.push(question.question_content.text);
  });

  // * GPT get question data!
  // ! SETUP YOUR OWN GPT ACCOUNT AND ADD YOUR KEY TO .env AS: "OPENAI_API_KEY"
  const result = await gptSendPrompt(
    topic,
    difficulty,
    allQuestionsContentText,
    numberOfQuestions
  );

  // grab response content and parse to JSON
  const gptResponse = result.choices[0].message.content;
  const gptResponseJson = JSON.parse(gptResponse || "");

  await setQuestionDoc(topic, difficulty, gptResponseJson.questions);
  console.log("GPT questions added!");
};

// * Send new questions to DB
const setQuestionDoc = async (
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
