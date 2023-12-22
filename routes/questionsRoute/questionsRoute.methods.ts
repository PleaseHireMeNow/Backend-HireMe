import { Question } from '../../types/models/Questions'
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from '../../modules/db'

export const getNestedDocument = async (
  collectionName: string,
  topic: string,
  difficulty: string,
) => {
  try {
    const questionCollectionRef = collection(doc(collection(db, collectionName), topic), difficulty);

    const collectionSnapshot = await getDocs(questionCollectionRef);
    let questionCollection: Question[] = []
    collectionSnapshot.forEach((doc) => {
      console.log(doc.id);
      const questionData = doc.data() as Question;
      questionData.question_id = doc.id;
      questionCollection.push(questionData);
    })
    return questionCollection
  } catch (error) {
    console.error('Error getting collection:', error);
    throw error; // Propagate the error
  }
};
