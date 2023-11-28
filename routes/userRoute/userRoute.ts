import express, { Request, Response } from 'express';

const router = express.Router();


router.get('/:userId', (req: Request, res: Response) => {
  const userId = req.params.userId;


  if (!userId) {
    return res.status(404).send('User not found');
  }

  res.status(200).json(userId);
});


router.delete('/:userId', (req: Request, res: Response) => {
  const userId = req.params.userId;


  if (!userId) {
    return res.status(404).send('User not found');
  }

  res.status(200).send('User data deleted successfully');
});





export default router;
