import {
  AnswerHistory,
  NewSessionResponse,
  Question,
} from "../../../types/models/Questions";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../modules/db";
import { User } from "../../../types/models/Questions";
import { getQuestionDocuments } from "../../utils/questionDocs.utils";

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

  console.log(answeredQuestions);

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

  let questionList: Question[] = [];

  // compare questions and find 10 new questions from list of allQuestions
  allQuestions.forEach(question => {
    if (
      userAnsweredQuestions.some(historyQuestion => {
        // console.log("historyQuestion is: ", historyQuestion);
        const matchingQiestionId =
          question.question_id !== historyQuestion.question_id;
        const moreWrong =
          historyQuestion.answered_incorrectly >=
          historyQuestion.answered_correctly;

        console.log(matchingQiestionId, moreWrong);

        return (matchingQiestionId || moreWrong)
        
      })
    ) {
      console.log("it works!");
      questionList.push(question);
    }
  });

  // console.log('questionList is: ', questionList);
  console.log("questionList length is: ", questionList.length);

  // set list of ~10~ question
  const sessionQuestionList = questionList.slice(0, numberOfQuestions);

  // check if we need more questions
  const needMoreQuestionsFlag = questionList.length < 20;

  return { sessionQuestionList, needMoreQuestionsFlag, current_question: 0 };
};

export const createNewSession = async (
  numberOfQuestions: number,
  topic: string,
  difficulty: string,
  userId: string
) => {
  // compare questions, return list of unanswered questions
  let sessionResponse: NewSessionResponse = await compareQuestionLists(
    topic,
    difficulty,
    userId,
    numberOfQuestions
  );

  const sessionQuestions = sessionResponse.sessionQuestionList;

  // get the existing current session
  const currentSessionRef = collection(
    doc(collection(db, "users"), userId),
    "current_session"
  );

  const currentSessionExistingSnapshot = await getDocs(currentSessionRef);
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
      doc(currentSessionRef, currentSessionExistingSnapshot.docs[0].id)
    );
  }
  await addDoc(currentSessionRef, {
    questions: sessionQuestions,
    timestamp: Timestamp.fromDate(new Date()),
    current_question: 0,
  });
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
  return currentSessionExisting.docs[0].data();
};

// * Get questions flow
// ✅ get questions from DB
// ✅ get userHistory from DB
// ✅ compare to user - see what has been looked at
// ✅ -- grab all incorrectly answered & unanswered questions
// ✅ send 10 questions to the user
// ✅ ADD to current session
// ✅ update users list of questions in DB
// ✅ send need more questions flag to frontend
// ✅ if not enough questions (less than 20) - get more Q's from GPT
// ✅ SET new Q's in questions DB

// * AI needs
// ✅ Get a list of questions (tech stack & level)

// What to give to prompt
// ✅ Topic
// ✅ Difficulty
// ✅ List of questions in DB
// variable number of questions to generate (deal with later)

// * update answers
// ✅ update user answer history
// update current session current_question property
// update got answer right/wrong in history + current session
