import express, {Application, Request, Response } from 'express';
const router = express.Router();
import question from '../../testing/db/question.json'

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


  res.sendStatus(200)

})

router.delete('/:userid/:questionid', (req, res) => {
  
  res.sendStatus(200)

})


export default router