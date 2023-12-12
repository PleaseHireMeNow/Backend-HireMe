import { collection, DocumentData, CollectionReference} from "firebase/firestore";
import {db} from '../database/firestore'
import { Question } from "../types/models/Questions";
import { getDoc, getDocs } from "firebase/firestore";


const createEntryLevelCollection = <T = DocumentData>() => {
    return collection(db, 'questions', 'JavaScript', 'entry-level') as CollectionReference<T>
}

const entryQuestion = createEntryLevelCollection<Question>();

export const getEntryQuestion = async () =>{

    const questionsDocs = await getDocs(entryQuestion);
    // console.log(questionsDocs);

    questionsDocs.docs.forEach((questionDoc) => {
        // console.log(questionDoc);
        let question = questionDoc.data()
        // questions.push(question);
        console.log(question.rating);
    })
 // 
 //

}
// getEntyQuestion();


