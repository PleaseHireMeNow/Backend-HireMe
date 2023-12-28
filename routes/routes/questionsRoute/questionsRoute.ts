import express from "express";
import questions from "../../../testing/db/question.json";
import { User } from "../../../types/models/Questions";
import { getQuestionDocuments, getUsersInfo } from "./questionsRoute.methods";
import { getMatchingUser } from "../../utils/users.utils";
import { setQuestionDoc } from "./questionsRoute.methods";
const router = express.Router();

import { createNewSession, getExistingSession } from "./questionsRoute.methods";
import { gptSendPrompt } from "../../../modules/openai";

router.get("notflag/:userid/:session/", async (req, res) => {
  // check if user id exists
  // get user id info from DB
  // topic, difficulty
  // previously answered questions
  // call questions from DB
  // compare (check route methods)
  const userId = req.params.userid;

  const user = await getMatchingUser(userId);

  if (
    //query the database to check if the user id is valid
    user?.username !== userId
  ) {
    res.sendStatus(403);
  } else {
    // pseudo code for looking up the user's topic(s) and difficulty(ies)
    let topic = user.topic_selection[0].topic.name;
    let difficulty = user.topic_selection[0].difficulty.name;

    if (req.params.session === "new") {
      const sessionResponse = await createNewSession(
        10,
        topic,
        difficulty,
        user.user_id
      );
      res.send(sessionResponse).status(200);
    } else if (req.params.session === "prev") {
      const sessionResponse = await getExistingSession(user.user_id);
      res.send(sessionResponse).status(200);
    }
  }
});

router.get("/flag/:userid", async (req, res) => {
  console.log("Made it to flag route!!");
  const flag = req.body.flag;
  const userId = req.params.userid;

  const user = await getMatchingUser(userId);

  const topic = user.topic_selection[0].topic.name;
  const difficulty = user.topic_selection[0].difficulty.name;

  const allQuestions = await getQuestionDocuments(topic, difficulty);

  // map questions text only
  const allQuestionsContentText: string[] = [];

  allQuestions.map(question => {
    allQuestionsContentText.push(question.question_content.text);
  });

  // console.log('allQuestionsContentText is:', allQuestionsContentText);
  
  //query the database to check if the user id is valid
  if (user?.username === userId && flag) {
    // * GPT get question data!
    // ! SETUP YOUR OWN GPT ACCOUNT AND ADD YOUR KEY TO .env AS: "OPENAI_API_KEY"
    const result = await gptSendPrompt(topic, difficulty, allQuestionsContentText, 10);
    const gptResponse = result.choices[0].message.content
    const gptResponseJson = JSON.parse(gptResponse || '')
    // console.log(gptResponseJson);


    // res.send(gptResponseJson.questions)
    setQuestionDoc(topic, difficulty, gptResponseJson.questions);
  }

  res.end();
});
export default router;
