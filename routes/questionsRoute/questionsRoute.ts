import express from 'express';
import questions from '../../testing/db/question.json'
const router = express.Router();

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