import express from 'express';
import dotenv from 'dotenv'
const bodyParser = require('body-parser');
const cors = require('cors')

import questionsRouter from './routes/questionsRoute/questionsRoute'
import answerHistoryRouter from './routes/answerHistoryRoute/answerHistory'
import loginRouter from './routes/loginRoute/loginRoute'
import registerRouter from './routes/registerRoute/registerRoute'
import stackOptionsRouter from './routes/stackOptionsRoute/stackOptionsRoute'
import stackSelectionRouter from './routes/stackSelectionRoute/stackSelection'
import userRouter from './routes/userRoute/userRoute'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/questions', questionsRouter);
app.use('/api/answer_history', answerHistoryRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/stack_options', stackOptionsRouter);
app.use('/api/stack_selection', stackSelectionRouter);
app.use('/api/user', userRouter);

if (process.env.NODE_ENV !== 'test'){
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} 


import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, DocumentData } from 'firebase/firestore/lite';
import { firebaseConfig } from './firebase.config'
// TODO: Replace the following with your app's Firebase project configuration



initializeApp(firebaseConfig);
const db = getFirestore();
console.log(typeof(db))
// async function questions(db: object) {
//   const questionsCollection = collection(getFirestore(initializeApp(firebaseConfig)), 'questions');
//   const questionsSnapshot = await getDocs(questionsCollection);
//   console.log(questionsSnapshot.docs[0])
//   const questionsList = questionsSnapshot.docs.map(doc => doc.data());
//   return questionsList;
// }
// console.log(questions(db))

let arrayX: DocumentData[] = [];
const questionsReference = collection(db, 'questions');
getDocs(questionsReference)
  .then((res) => {
    arrayX.push(res.docs[0].data())
  })
console.log(arrayX);

module.exports = app;