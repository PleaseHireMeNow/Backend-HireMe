import express, {Application, Request, Response } from 'express';
import dotenv from 'dotenv'

const questionsRouter = require('./routes/questionsRoute/questionsRoute')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/questions', questionsRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;