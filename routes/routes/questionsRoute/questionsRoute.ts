import express from "express";
import questions from "../../../testing/db/question.json";
import { User } from "../../../types/models/Questions";
import { getUsersInfo } from "./questionsRoute.methods";
const router = express.Router();

import { createNewSession, compareQuestionLists } from "./questionsRoute.methods";

router.get("/:userid/:session", async (req, res) => {
  // check if user id exists
  // get user id info from DB
  // topic, difficulty
  // previously answered questions 
  // call questions from DB
  // compare (check route methods)

  const userId = req.params.userid

  const userList = await getUsersInfo();

  const matchingUser: User = userList.find(user => user.username === userId) as User;

  if (
    //query the database to check if the user id is valid
    matchingUser?.username !== userId
  ) {
    res.sendStatus(403);
  } else {
    // pseudo code for looking up the user's topic(s) and difficulty(ies)
    let topic = matchingUser.topic_selection[0].topic.name;
    let difficulty = matchingUser.topic_selection[0].difficulty.name;
    
    if (req.params.session === 'new') {
      const allQuestions = await createNewSession(10, topic, difficulty, matchingUser.user_id);
      res.send(allQuestions).status(200);
    }
    // const userQuestionHistory = matchingUser.history

    // allQuestions.forEach((question) => {
    //   userQuestionHistory.some((historyQuestion) => {
    //     question.question_id === historyQuestion.
    //   })
    // })

    // compareQuestionLists(allQuestions, matchingUser)




  }
});

export default router;
