import express, { Request, Response } from 'express';
import userJson from '../../../testing/db/user.json'
const router = express.Router();


router.get('/:userid', (req: Request, res: Response) => {


if (userJson[0].user_id === req.params.userId) {
  res.status(200).send(userJson[0].user_id)
} else {
  res.sendStatus(403)
}

});


router.delete('/:userid', (req: Request, res: Response) => {


  if (userJson[0].user_id === req.params.userid) {
    res.sendStatus(200)
  } else {
    res.sendStatus(403)
  }


});





export default router;
