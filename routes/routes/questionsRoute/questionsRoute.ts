import express from "express";
import questions from "../../../testing/db/question.json";
import { User } from "../../../types/models/Questions";
import { getUsersInfo } from "./questionsRoute.methods";
import { getMatchingUser } from "../../utils/users.utils";

const router = express.Router();

import { createNewSession, getExistingSession } from "./questionsRoute.methods";

router.get("/:userid/:session", async (req, res) => {
  // check if user id exists
  // get user id info from DB
  // topic, difficulty
  // previously answered questions 
  // call questions from DB
  // compare (check route methods)

  const userId = req.params.userid

  const userList = await getUsersInfo();

  const user = await getMatchingUser(userId)

  if (
    //query the database to check if the user id is valid
    user?.username !== userId
  ) {
    res.sendStatus(403);
  } else {
    // pseudo code for looking up the user's topic(s) and difficulty(ies)
    let topic = user.topic_selection[0].topic.name;
    let difficulty = user.topic_selection[0].difficulty.name;
    
    if (req.params.session === 'new') {
      const sessionResponse = await createNewSession(10, topic, difficulty, user.user_id);
      res.send(sessionResponse).status(200);
    } else if (req.params.session === 'prev') {
      const sessionResponse = await getExistingSession(user.user_id);
      res.send(sessionResponse).status(200);
    }
    // const userQuestionHistory = user.history

    // allQuestions.forEach((question) => {
    //   userQuestionHistory.some((historyQuestion) => {
    //     question.question_id === historyQuestion.
    //   })
    // })

    // compareQuestionLists(allQuestions, user)




  }
});

export default router;
