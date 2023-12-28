import express, { Request, Response } from 'express';
import userJson from '../../../testing/db/user.json'
import { getMatchingUser } from '../../utils/users.utils';
const router = express.Router();
import { getUserDocument } from './userRoute.methods';


router.get('/:userid', async (req: Request, res: Response) => {
const user = await getMatchingUser(req.params.userid)
if (user) {
  const userDoc = await getUserDocument(user.user_id)
  res.send(userDoc).status(200)
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
