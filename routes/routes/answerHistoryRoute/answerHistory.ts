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
  // console.log('req.params is:', req.params);
  // ! get rid of || object used for testing
  const answer = req.body.answer || {
    answer_content: {
      text: "A JavaScript library for building user interfaces.",
    },
    is_correct: true,
  };
  const user = (await getMatchingUser(req.params.userid)) as User;
  const questionData = question[0];
  const currentSessionDocumentSnapshot =
    await getCurrentSessionDocumentSnapshot(user.user_id);

  postAnswerHistory(
    user.user_id,
    answer,
    questionData,
    currentSessionDocumentSnapshot.id
  );

  res.sendStatus(200);
});

export default router;
