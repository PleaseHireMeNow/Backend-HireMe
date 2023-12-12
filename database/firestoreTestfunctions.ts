import {questionsCol} from '../database/firestore'
import { getDocs, setDoc, doc } from '@firebase/firestore'
import { Questions } from '../types/models/Questions';
import * as admin from 'firebase-admin';



/*
export const createQuestion = async () => {
    cconst questionRef = doc(questionsCol, '1biKB1NRZg4ET0zbGKFx')
        await setDoc(questionRef, {
            "question-content": {
              "text": "What is the concept of Lifting State Up in React?",
              "answers": [
                {
                  "answer-content": {
                    "text": "It involves moving shared state data to the closest common ancestor when multiple components need to share the same changing data."
                  },
                  "is-correct": true
                },
                {
                  "answer-content": {
                    "text": "It refers to moving state data from parent components to child components for better performance."
                  },
                  "is-correct": false
                },
                {
                  "answer-content": {
                    "text": "It involves using the setState function to lift state data to the top level of the component tree."
                  },
                  "is-correct": false
                },
                {
                  "answer-content": {
                    "text": "It is a concept used only in class components and not in functional components."
                  },
                  "is-correct": false
                }
              ]
            }
        });
        return true;

};

*/
