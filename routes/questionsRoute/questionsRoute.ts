import express from 'express';
import questions from '../../testing/db/question.json'
const router = express.Router();  
import { FieldValue } from 'firebase/firestore';
import {db} from '../../modules/db'
import {getNestedDocument} from '../../modules/questions'
import { getDocs, getDoc, setDoc, doc } from '@firebase/firestore'
import { Questions } from '../../types/models/Questions';


router.get('/:userid', async (req, res) => {
    // pseudo code for looking up the user's topic(s) and difficulty(ies)
    let topic = 'JavaScript';
    let difficulty = 'entry-level';
    //
    const questions = await getNestedDocument('questions', topic, difficulty);
    res.send(questions).status(200);
});

router.post('/testQuestion', async (req, res) => {
  console.log('posting test question'); 

    // const questionRef = doc(questionsCol, '1biKB1NRZg4ET0zbGKFx')
    // await setDoc(questionRef, {
    //         "question_content": {
    //           "text": "What is the concept of Lifting State Up in React?",
    //           "answers": [
    //             {
    //               "answer_content": {
    //                 "text": "It involves moving shared state data to the closest common ancestor when multiple components need to share the same changing data."
    //               },
    //               "is_correct": true
    //             },
    //             {
    //               "answer_content": {
    //                 "text": "It refers to moving state data from parent components to child components for better performance."
    //               },
    //               "is_correct": false
    //             },
    //             {
    //               "answer_content": {
    //                 "text": "It involves using the setState function to lift state data to the top level of the component tree."
    //               },
    //               "is_correct": false
    //             },
    //             {
    //               "answer_content": {
    //                 "text": "It is a concept used only in class components and not in functional components."
    //               },
    //               "is_correct": false
    //             }
    //           ]
    //         }
    //     });
        res.sendStatus(201);
});
router.get(`/testQuestion/:id`, async(req, res) => {
    console.log('getting question 1biKB1NRZg4ET0zbGKFx');
    // const questionDoc = await getDocs(questionsCol).doc('1biKB1NRZg4ET0zbGKFx');
    // getDoc(questionDoc);
    console.log(db)
    
    


  res.sendStatus(200);


});





















 
router.get('/:userid', (req, res) => {
  if (
    //query the database to check if the user id is valid
    req.params.userid !== 'string1'
    ) {
    res.sendStatus(403);
  }
  res.status(200).send(questions);
})



export default router
