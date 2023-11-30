import express, { Request, Response } from 'express';
import userJson from '../../testing/db/user.json'
const router = express.Router();


router.get('/:userId', (req: Request, res: Response) => {

if (userJson[0].userId === req.params.userId) {
  res.status(200).send(userJson[0].userId)
} else {
  res.sendStatus(403)
}

});


router.delete('/:userId', (req: Request, res: Response) => {


  if (userJson[0].userId === req.params.userId) {
    res.sendStatus(200)
  } else {
    res.sendStatus(403)
  }


});





export default router;
