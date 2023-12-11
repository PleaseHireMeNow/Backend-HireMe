import express, { Request, Response } from 'express';
const router = express.Router();
import topicOptions from '../../testing/db/topic-options.json'

router.get('/', (req, res) => {

  res.status(200).send(topicOptions);

})

export default router