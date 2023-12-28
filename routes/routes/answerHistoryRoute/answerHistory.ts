import express, { Application, Request, Response } from 'express';
const router = express.Router();
import question from '../../../testing/db/question.json'
import { postAnswerHistory } from './answerHistory.methods';

router.get('/:userid', (req: Request, res: Response) => {
  // ! might need to update this later once we get the database up and running
  if (
    //query the database to check if the user id is valid
    req.params.userid !== 'string1'
  ) {
    res.sendStatus(403);
  }

  res.status(200).send(question)

})

router.post('/:userid', (req: Request, res: Response) => {
  // console.log('req.params is:', req.params);
  const answer = req.body.answer;
  const userId = 'HzseqOG9O5zX5nsznsVz'

  postAnswerHistory(
    userId,
    {
      answer_content: {
        text: "A JavaScript library for building user interfaces."
      },
      is_correct: true
    },
    question[0]
    )
  res.sendStatus(200)

})

router.delete('/:userid/:questionid', (req, res) => {

  res.sendStatus(200)

})


export default router