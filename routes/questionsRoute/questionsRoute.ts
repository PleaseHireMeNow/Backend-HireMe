import express, { response } from 'express';
const router = express.Router();  
import { FieldValue } from 'firebase/firestore';
import {db} from '../../database/firestore'
import {questionsCol} from '../../database/firestore'
import { getDocs, getDoc, setDoc, doc } from '@firebase/firestore'
import { Questions } from '../../types/models/Questions';
import { getEntryQuestion } from '../../modules/addQuestionToUser';

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

router.get('/testQuestion', async (req, res) => {
   console.log('posting test question'); 

    // const questionRef = doc(questionsCol, '1biKB1NRZg4ET0zbGKFx')
    let reponse = await getEntryQuestion();
    console.log(response);
    res.sendStatus(201);

});
// router.get(`/testQuestion:id`, async(req, res) => {
//     console.log('getting question 1biKB1NRZg4ET0zbGKFx');
//     const questionDoc = await getDocs(questionsCol).doc('1biKB1NRZg4ET0zbGKFx');
//     getDoc(questionDoc);
//     
//
//
//
//
//
// });
//
//
//


















 
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
