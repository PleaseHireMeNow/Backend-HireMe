import express from 'express';
const router = express.Router();  
import { FieldValue } from 'firebase/firestore';
import {db} from '../../database/firestore'
import {questionsCol} from '../../database/firestore'
import { getDocs, getDoc, setDoc, doc } from '@firebase/firestore'
import { Questions } from '../../types/models/Questions';


router.get('/allQuestions', async (req, res) => {
    // const questions = db.collection('questions');
    const questionsDocs = await getDocs(questionsCol);
    // console.log(questionsDocs);
    let questions: Questions = [] 

    questionsDocs.docs.forEach((questionDoc) => {
        console.log(questionDoc.id);
        let question = questionDoc.data()
        questions.push(question);
    })
    res.send(questions).status(200);
});

router.post('/testQuestion', async (req, res) => {
   console.log('posting test question'); 

    const questionRef = doc(questionsCol, '1biKB1NRZg4ET0zbGKFx')
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
        res.sendStatus(201);
});
router.get(`/testQuestion:id`, async(req, res) => {
    console.log('getting question 1biKB1NRZg4ET0zbGKFx');
    const questionDoc = await getDocs(questionsCol).doc('1biKB1NRZg4ET0zbGKFx');
    getDoc(questionDoc);
    





});





















 
router.get('/:userid', (req, res) => {
  if (
    //query the database to check if the user id is valid
    req.params.userid !== 'string1'
    ) {
    res.sendStatus(403);
  }
  res.sendStatus(200);
})



export default router
