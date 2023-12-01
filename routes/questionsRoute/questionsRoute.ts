import express from 'express';
const router = express.Router();  
import { FieldValue } from 'firebase/firestore';
import {db} from '../../database/firestore'

router.get('/allQuestions', async (req, res) => {
    const questions = db.collection('questions');
    const doc = await questions.get()
    if (!doc.exists) {
        return res.sendStatus(400)
    }
    console.log(doc);
    // res.status(200).send(doc.data())
    res.sendStatus(200)
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
