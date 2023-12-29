import express from 'express';
import dotenv from 'dotenv'
const bodyParser = require('body-parser');
const cors = require('cors') 
import questionsRouter from './routes/routes/questionsRoute/questionsRoute'
import answerHistoryRouter from './routes/routes/answerHistoryRoute/answerHistory'
import loginRouter from './routes/routes/loginRoute/loginRoute'
import registerRouter from './routes/routes/registerRoute/registerRoute'
import topicOptionsRouter from './routes/routes/topicOptionsRoute/topicOptionsRoute'
import topicSelectionRouter from './routes/routes/topicSelectionRoute/topicSelection'
import userRouter from './routes/routes/userRoute/userRoute'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/questions', questionsRouter);
app.use('/api/answer_history', answerHistoryRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/topic_options', topicOptionsRouter);
app.use('/api/topic_selection', topicSelectionRouter);
app.use('/api/user', userRouter);

if (process.env.NODE_ENV !== 'test'){
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} 

module.exports = app;
