import express, { Request, Response } from 'express';
const router = express.Router();
import stackOptions from '../../testing/db/stack-options.json'

router.get('/', (req, res) => {

  res.status(200).send(stackOptions);

})

export default router