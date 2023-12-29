// Tools
import express from "express";
const router = express.Router();

// Dummy Data
import user from "../../../testing/db/user.json";
import { getMatchingUser } from "../../utils/users.utils";
import { updateTopicAndDifficulty } from "./topicSelection.method";
const selection = user[0].topic_selection;
// * ROUTES

router.put("/:userid", async (req, res) => {
  const userId = req.params.userid;
  const user = await getMatchingUser(userId);
  const topic = req.body.topic;
  const difficulty = req.body.difficulty;

  // check if user id exists
  if (
    //query the database to check if the user id is valid
    user?.username !== userId
  ) {
    res.sendStatus(403);
  } else {
    updateTopicAndDifficulty(topic, difficulty, user.user_id);
  }
  // Send status 200 and array of strings
  res.sendStatus(200);
});

export default router;
