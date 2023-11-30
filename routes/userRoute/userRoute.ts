import express, { Request, Response } from 'express';

const router = express.Router();


router.get('/:userId', (req: Request, res: Response) => {
  const userId = req.params.userId;


<<<<<<< Updated upstream
  if (!userId) {
    return res.status(404).send('User not found');
  }
=======
    if (userJson[0].userId === req.params.userId ) {
      res.status(200).send(userJson[0].userId)
   } else {
      res.status(403)
   }
res.status(201)
>>>>>>> Stashed changes

  res.status(200).json(userId);
});


router.delete('/:userId', (req: Request, res: Response) => {
  const userId = req.params.userId;


  if (!userId) {
    return res.status(404).send('User not found');
  }

<<<<<<< Updated upstream
  res.status(200).send('User data deleted successfully');
=======

>>>>>>> Stashed changes
});





export default router;
