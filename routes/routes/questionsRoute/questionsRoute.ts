import express from "express";
import { getMatchingUser } from "../../utils/users.utils";
import {
  createNewSession,
  getExistingSession,
  invokeGpt,
} from "./questionsRoute.methods";
import { Session } from "../../../types/models/Questions";

const router = express.Router();

router.get("/:userid/:session/", async (req, res) => {
  // get user id info from DB
  const userId = req.params.userid;
  const user = await getMatchingUser(userId);

  // looking up the user's topic(s) and difficulty(ies)
  const topic = user.topic_selection[0].topic.name;
  const difficulty = user.topic_selection[0].difficulty.name;

  // check if user id exists
  if (
    //query the database to check if the user id is valid
    user?.username !== userId
  ) {
    res.sendStatus(403);
  } else {
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

    console.log('GPT flag is: ', sessionResponse.needMoreQuestionsFlag);
    
    // sessionResponse.needMoreQuestionsFlag && invokeGpt(topic, difficulty, 10);
  }
});

export default router;
