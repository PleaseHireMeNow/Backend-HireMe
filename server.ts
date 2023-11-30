import express from 'express';
import dotenv from 'dotenv'
const bodyParser = require('body-parser');

import questionsRouter from './routes/questionsRoute/questionsRoute'
import answerHistoryRouter from './routes/answerHistoryRoute/answerHistory'
import loginRouter from './routes/loginRoute/loginRoute'
import registerRouter from './routes/registerRoute/registerRoute'
import stackRouter from './routes/stackRoute/stackRoute'
import stackSelectionRouter from './routes/stackSelectionRoute/stackSelection'
import userRouter from './routes/userRoute/userRoute'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/questions', questionsRouter);
app.use('/api/answerHistory', answerHistoryRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/stackRouter', stackRouter);
app.use('/api/stackSelection', stackSelectionRouter);
app.use('/api/user', userRouter);

if (process.env.NODE_ENV !== 'test'){
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} 


module.exports = app;