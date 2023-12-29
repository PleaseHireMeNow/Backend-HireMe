import {
  Difficulty,
  Topic,
} from "../../../types/models/models";
import {
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../modules/db";

export const updateTopicAndDifficulty = async (
  topic: Topic,
  difficulty: Difficulty,
  userId: string
) => {
  const topicSelectionRef = doc(collection(db, "users"), userId)

  const topicSelection = {topic_selection: [{topic, difficulty}]}

  await setDoc(topicSelectionRef, topicSelection, {merge: true}) 
};
