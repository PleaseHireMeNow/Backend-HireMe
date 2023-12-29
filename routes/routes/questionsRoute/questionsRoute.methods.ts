import {
  AnswerHistory,
  Session,
  SessionQuestion,
} from "../../../types/models/Questions";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  Timestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../modules/db";
import { User } from "../../../types/models/Questions";
import { getQuestionDocuments } from "../../utils/questionDocs.utils";
import { gptSendPrompt } from "../../../modules/openai";
import { setQuestionDoc } from "../flagRoute/flagRoute.methods";

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
  const allQuestions = await getQuestionDocuments(topic, difficulty);

  // gets questionHistory from user DB
  const userAnsweredQuestions = await getQuestionHistory(userId);

  console.log("allQuestions length is:", allQuestions.length);
  console.log("userAnsweredQuestions length is:", userAnsweredQuestions.length);

  let questionList: SessionQuestion[] = [];

  // compare questions and find 10 new questions from list of allQuestions
  allQuestions.forEach(question => {
    if (
      userAnsweredQuestions.some(historyQuestion => {
        // console.log("historyQuestion is: ", historyQuestion);
        const matchingQuestionId =
          question.question_id !== historyQuestion.question_id;
        const moreWrong =
          historyQuestion.answered_incorrectly >=
          historyQuestion.answered_correctly;

        // console.log(matchingQuestionId, moreWrong);

        return matchingQuestionId || moreWrong;
      })
    ) {
      // console.log("it works!");
      questionList.push({ question });
    }
  });

  // console.log('questionList is: ', questionList);
  console.log("questionList length is: ", questionList.length);

  // set list of ~10~ question
  const sessionQuestionList = questionList.slice(0, numberOfQuestions);

  // check if we need more questions
  const needMoreQuestionsFlag = questionList.length < 20;

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

export const createNewSession = async (
  numberOfQuestions: number,
  topic: string,
  difficulty: string,
  userId: string
) => {
  // compare questions, return list of unanswered questions
  let sessionResponse: {
    sessionObject: Session;
    needMoreQuestionsFlag: boolean;
  } = await compareQuestionLists(topic, difficulty, userId, numberOfQuestions);

  // get the existing current session
  const currentSessionCollectionRef = collection(
    doc(collection(db, "users"), userId),
    "current_session"
  );

  const currentSessionExistingSnapshot = await getDocs(
    currentSessionCollectionRef
  );
  // save the existing current session to previous sessions
  const previousSessionsRef = collection(
    doc(collection(db, "users"), userId),
    "previous_sessions"
  );
  // send the questions to the database
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

  const currentSessionDocRef = doc(currentSessionCollectionRef);
  console.log(currentSessionDocRef.id);

  sessionResponse.sessionObject.session_id = currentSessionDocRef.id;
  const currentSession = sessionResponse.sessionObject;

  await setDoc(currentSessionDocRef, currentSession);
  // return the set of questions
  return sessionResponse;
};

export const getExistingSession = async (userId: string) => {
  // get existing session data
  const currentSessionRef = collection(
    doc(collection(db, "users"), userId),
    "current_session"
  );
  const currentSessionExisting = await getDocs(currentSessionRef);
  return currentSessionExisting.docs[0].data() as Session;
};

export const invokeGpt = async (topic: string, difficulty: string) => {

  console.log('GPT invoked!');
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
    10
  );

  // grab response content and parse to JSON
  const gptResponse = result.choices[0].message.content;
  const gptResponseJson = JSON.parse(gptResponse || "");

  await setQuestionDoc(topic, difficulty, gptResponseJson.questions);
  console.log('GPT questions added!');
};
