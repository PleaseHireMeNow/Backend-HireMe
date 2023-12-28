import express from "express";
import { getQuestionDocuments } from "../../utils/questionDocs.utils";
import { getMatchingUser } from "../../utils/users.utils";
import { setQuestionDoc } from "./flagRoute.methods";
import { gptSendPrompt } from "../../../modules/openai";
const router = express.Router();



router.get("/:userid", async (req, res) => {
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