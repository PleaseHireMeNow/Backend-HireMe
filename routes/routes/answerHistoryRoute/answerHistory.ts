import express, { Request, Response } from "express";
const router = express.Router();
import question from "../../../testing/db/question.json";
import { Answer, User } from "../../../types/models/models";
import { getMatchingUser } from "../../utils/users.utils";
import {
  getCurrentSessionDocumentSnapshot,
  postAnswerHistory,
} from "./answerHistory.methods";

router.post("/:userid", async (req: Request, res: Response) => {
  const answer = req.body.answer;
  const questionData = req.body.question;
  // Get user information from database
  const user = (await getMatchingUser(req.params.userid)) as User;
  // Get user's session information from database
  const currentSessionDocumentSnapshot =
    await getCurrentSessionDocumentSnapshot(user.user_id);

  // Post the answer to the current session and the user's history.
  postAnswerHistory(
    user.user_id,
    answer,
    questionData,
    currentSessionDocumentSnapshot.id
  );

  res.sendStatus(200);
});

export default router;
