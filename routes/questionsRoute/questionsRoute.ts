import express from 'express';
const router = express.Router();

router.get('/:userid', (req, res) => {
  if (
    //query the database to check if the user id is valid
    req.params.userid !== 'string1'
    ) {
    res.sendStatus(403);
  }
  res.sendStatus(200);
})

export default router