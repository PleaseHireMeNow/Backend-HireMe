import {
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../modules/db";

export const getTopicOptions = async () => {
  const topicRef = collection(db, "topics-difficulty-options");

  const topicSnapshot = await getDocs(topicRef);
  console.log(topicSnapshot.docs[0].data());

  const topicOptions = topicSnapshot.docs[0].data();

  return topicOptions;
};
