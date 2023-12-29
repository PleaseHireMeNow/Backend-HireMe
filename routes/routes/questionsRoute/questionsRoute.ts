import express from "express";
import { getMatchingUser } from "../../utils/users.utils";
const router = express.Router();

import {
  createNewSession,
  getExistingSession,
  invokeGpt,
} from "./questionsRoute.methods";
import { Session } from "../../../types/models/Questions";

router.get("/:userid/:session/", async (req, res) => {
  // get user id info from DB
  const userId = req.params.userid;
  const user = await getMatchingUser(userId);

  // check if user id exists
  if (
    //query the database to check if the user id is valid
    user?.username !== userId
  ) {
    res.sendStatus(403);
  } else {
    // looking up the user's topic(s) and difficulty(ies)
    let topic = user.topic_selection[0].topic.name;
    let difficulty = user.topic_selection[0].difficulty.name;

    let sessionObject: Session = {} as Session;
    let sessionResponse: {
      sessionObject: Session;
      needMoreQuestionsFlag: boolean;
    } = { sessionObject, needMoreQuestionsFlag: false };

    if (req.params.session === "new") {
      sessionResponse = await createNewSession(
        10,
        topic,
        difficulty,
        user.user_id
      );
    } else if (req.params.session === "prev") {
      sessionResponse.sessionObject = await getExistingSession(user.user_id);
    }

    res.send(sessionResponse.sessionObject).status(200);

    sessionResponse.needMoreQuestionsFlag && invokeGpt(topic, difficulty);
  }
});

export default router;
