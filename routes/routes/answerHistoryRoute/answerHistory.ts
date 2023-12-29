import express, { Application, Request, Response } from 'express';
const router = express.Router();
import question from '../../../testing/db/question.json'
import { User } from '../../../types/models/Questions';
import { getMatchingUser } from '../../utils/users.utils';
import { getCurrentSessionDocumentSnapshot, postAnswerHistory } from './answerHistory.methods';

router.get('/:userid', (req: Request, res: Response) => {
  // ! might need to update this later once we get the database up and running
  if (
    //query the database to check if the user id is valid
    req.params.userid !== 'string1'
  ) {
    res.sendStatus(403);
  }
  else (
    res.status(200).send(question)
  )

})

router.post('/:userid', async (req: Request, res: Response) => {
  // console.log('req.params is:', req.params);
  // ! get rid of || object used for testing
  const answer = req.body.answer || {
    answer_content: {
      text: "A JavaScript library for building user interfaces."
    },
    is_correct: true
  };
  const user = await getMatchingUser(req.params.userid) as User;
  const questionData = question[0]
  const currentSessionDocumentSnapshot = await getCurrentSessionDocumentSnapshot(user.user_id)

  postAnswerHistory(
    user.user_id,
    answer,
    questionData,
    currentSessionDocumentSnapshot.id
  );

  res.sendStatus(200)

})

router.delete('/:userid/:questionid', (req, res) => {

  res.sendStatus(200)

})


export default router