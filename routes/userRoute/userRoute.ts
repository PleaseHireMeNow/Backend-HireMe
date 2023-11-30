import express, { Request, Response } from 'express';
import userJson from '../../testing/db/user.json'
const router = express.Router();


router.get('/:userId', (req: Request, res: Response) => {

  for (let user of userJson)
  if (user.userId === req.params.userId ) {
    return res.status(200).send(user)
  } else {
    return res.status(403)
  }

});


router.delete('/:userId', (req: Request, res: Response) => {

  for (let user of userJson)
  if (user.userId === req.params.userId ) {
    return res.status(200).send(user)
  } else {
    return res.status(403)
  }

  
});





export default router;
