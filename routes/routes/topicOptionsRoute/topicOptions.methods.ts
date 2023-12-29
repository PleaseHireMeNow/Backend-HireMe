import {
  AnswerHistory,
  Question,
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

export const getTopicOptions = async () => {
  const topicRef = collection(db, "topics-difficulty-options");

  const topicSnapshot = await getDocs(topicRef);
  console.log(topicSnapshot.docs[0].data());
  

  const topicOptions = topicSnapshot.docs[0].data();

  return topicOptions;
};
