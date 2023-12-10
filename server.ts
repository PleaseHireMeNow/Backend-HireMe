import express from 'express';
// const express = require('express'); 
import { importQuestionData } from './dataImport/questiondbfillerfunction';
import questionsRouter from './routes/questionsRoute/questionsRoute'
// const answerHistoryRouter = require('./routes/answerHistoryRoute/answerHistory')
// const loginRouter = require('./routes/loginRoute/loginRoute')
// const registerRouter = require('./routes/registerRoute/registerRoute')
// const stackRouter = require('./routes/stackRoute/stackRoute')
// const stackSelectionRouter = require('./routes/stackSelectionRoute/stackSelection')
// const userRouter = require('./routes/userRoute/userRoute')

// dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/questions', questionsRouter);
// app.use('/api/answerHistory', answerHistoryRouter);
// app.use('/api/login', loginRouter);
// app.use('/api/register', registerRouter);
// app.use('/api/stackRouter', stackRouter);
// app.use('/api/stackSelection', stackSelectionRouter);
// app.use('/api/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// importQuestionData();


module.exports = app;
