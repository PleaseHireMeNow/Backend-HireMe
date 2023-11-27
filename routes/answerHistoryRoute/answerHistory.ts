import * as express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  console.log('in get router ');
  
  res.sendStatus(200)

})

router.post('/:userid', (req, res) => {


})

router.delete('/:userid/:questionid', (req, res) => {


})


export default router