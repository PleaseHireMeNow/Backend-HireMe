import {
  AnswerHistory,
  NewSessionResponse,
  Session,
  SessionQuestion,
  TopicSelection,
} from "../../../types/models/models";
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  Timestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../modules/db";
import { getQuestionDocuments } from "../../utils/questionDocs.utils";
import { invokeGpt } from "../../utils/gpt.utils";

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
  topic_selection: TopicSelection,
  userId: string
) => {
  const topic = topic_selection.topic.name;
  const difficulty = topic_selection.difficulty.name;

  // get number of questions from the db
  let allQuestions = await getQuestionDocuments(topic, difficulty);

  // Check if there's enough initial questions in database,
  // if none or less than 10 generate the difference
  if (allQuestions.length < 10) {
    const numberToGrab = 10 - allQuestions.length;

    console.log("\nNo questions for:", topic, difficulty);
    console.log("Getting", numberToGrab, " questions from GPT");

    // await invokeGpt(topic, difficulty, numberToGrab);

    // grab newly created questions from database
    allQuestions = await getQuestionDocuments(topic, difficulty);
  }

  // gets questionHistory from user DB
  const userAnsweredQuestions = await getQuestionHistory(userId);

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

  // always set list of 10 questions to send
  const sessionQuestionList = questionList.slice(0, 10);

  // check if we need more questions
  const needMoreQuestionsFlag = questionList.length < 20;

  // build a session object
  const sessionObject: Session = {
    current_question: 0,
    answered_correctly: 0,
    timestamp: Timestamp.fromDate(new Date()),
    questions: sessionQuestionList,
    topic_selection,
  };

  return { sessionObject, needMoreQuestionsFlag };
};

export const createNewSessionResponse = async (
  topic_selection: TopicSelection,
  userId: string
) => {
  // compare questions, return list of unanswered questions
  let sessionResponse: NewSessionResponse = await compareQuestionLists(
    topic_selection,
    userId
  );
  // creates session ID with createNewSession returns new create sessionID
  return (await createNewSession(
    sessionResponse,
    userId
  )) as NewSessionResponse;
};

export const createNewSession = async (
  sessionResponse: NewSessionResponse,
  userId: string
) => {
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
    // add existing session to "previous_sessions"
    await setDoc(
      doc(previousSessionsRef, currentSessionExistingSnapshot.docs[0].id),
      currentSessionExistingSnapshot.docs[0].data()
    );

    // remove now old existing session from "current_session"
    await deleteDoc(
      doc(
        currentSessionCollectionRef,
        currentSessionExistingSnapshot.docs[0].id
      )
    );
  }

  // grab current session document reference
  const currentSessionDocRef = doc(currentSessionCollectionRef);

  // update sessionObject with new session_id
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

export const getExistingPreviousSession = async (
  userId: string,
  sessionId: string
) => {
  // get previous session data
  const previousSessionRef = doc(
    collection(doc(collection(db, "users"), userId), "previous_sessions"),
    sessionId
  );

  const previousSessionExisting = await getDoc(previousSessionRef);
  return previousSessionExisting.data() as Session;
};

export const deleteExistingPreviousSession = async (
  userId: string,
  sessionId: string
) => {
  // get previous session data
  const previousSessionRef = doc(
    collection(doc(collection(db, "users"), userId), "previous_sessions"),
    sessionId
  );

  await deleteDoc(previousSessionRef);
};
