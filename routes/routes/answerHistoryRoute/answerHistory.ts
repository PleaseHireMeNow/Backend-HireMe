import express, { Request, Response } from "express";
const router = express.Router();
import question from "../../../testing/db/question.json";
import { User } from "../../../types/models/models";
import { getMatchingUser } from "../../utils/users.utils";
import {
  getCurrentSessionDocumentSnapshot,
  postAnswerHistory,
} from "./answerHistory.methods";

router.post("/:userid", async (req: Request, res: Response) => {
  // ! FOR TESTING
  const testAnswer = {
    answer_content: {
      text: "A JavaScript library for building user interfaces.",
    },
    is_correct: true,
  };
  const testQuestion = question[0];

  // ! get rid of || testAnswer used for testing
  const answer = req.body.answer || testAnswer

  // ! get rid of || testQuestion used for testing
  const questionData = req.body.question || testQuestion

  console.log("answer is:", answer);
  console.log("questionData is:", questionData);
  

  const user = (await getMatchingUser(req.params.userid)) as User;

  const currentSessionDocumentSnapshot =
    await getCurrentSessionDocumentSnapshot(user.user_id);

    console.log(currentSessionDocumentSnapshot.id);
    
  
  postAnswerHistory(
    user.user_id,
    answer,
    questionData,
    currentSessionDocumentSnapshot.id
  );

  res.sendStatus(200);
});

export default router;
