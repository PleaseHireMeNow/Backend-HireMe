import express from "express";
import questions from "../../testing/db/question.json";
const router = express.Router();

import { getNestedDocument } from "./questionsRoute.methods";

router.get("/:userid", async (req, res) => {
  if (
    //query the database to check if the user id is valid
    req.params.userid !== "string1"
  ) {
    res.sendStatus(403);
  }

  // pseudo code for looking up the user's topic(s) and difficulty(ies)
  let topic = "JavaScript";
  let difficulty = "entry-level";
  //
  const questions = await getNestedDocument("questions", topic, difficulty);
  res.send(questions).status(200);
});

export default router;
