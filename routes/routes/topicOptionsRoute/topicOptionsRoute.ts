import express, { Request, Response } from 'express';
const router = express.Router();
import { getTopicOptions } from './topicOptions.methods';

router.get('/:userid', async (req, res) => {
  

  const topicOptions = await getTopicOptions()


  res.send(topicOptions).status(200);

})

export default router