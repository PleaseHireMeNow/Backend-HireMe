import express from "express";
import { getMatchingUser } from "../../utils/users.utils";
import {
  createNewSession,
  createNewSessionResponse,
  getExistingCurrentSession as getExistingCurrentSession,
  getExistingPreviousSession,
} from "./questionsRoute.methods";
import {
  NewSessionResponse,
  Session,
  TopicSelection,
} from "../../../types/models/models";
import { invokeGpt } from "../../utils/gpt.utils";

const router = express.Router();

router.get("/:userid/:session/", async (req, res) => {
  // get user id info from DB
  const userId = req.params.userid;
  const user = await getMatchingUser(userId);
  
  // looking up the user's topic(s) and difficulty(ies)
  const topic_selection = user.topic_selection[0];


  // check if user id exists
  if (
    //query the database to check if the user id is valid
    user?.username !== userId
  ) {
    res.sendStatus(403);
  } else {
    let sessionObject: Session = {} as Session;

    let sessionResponse: NewSessionResponse = {
      sessionObject,
      needMoreQuestionsFlag: false,
    };

    if (req.params.session === "new") {
      sessionResponse = await createNewSessionResponse(
        topic_selection,
        user.user_id
      );
    } else if (req.params.session === "prev") {
      sessionResponse.sessionObject = await getExistingCurrentSession(
        user.user_id
      );
    }

    res.send(sessionResponse.sessionObject).status(200);

    // console.log("GPT flag is: ", sessionResponse.needMoreQuestionsFlag);
    sessionResponse.needMoreQuestionsFlag &&
      invokeGpt(
        topic_selection.topic.name,
        topic_selection.difficulty.name,
        10
      );
  }
});

router.get("/previous/:userid/:sessionid", async (req, res) => {
  const userId = req.params.userid;
  const user = await getMatchingUser(userId);
  const sessionId = req.params.sessionid
  // check if user id exists
  if (
    //query the database to check if the user id is valid
    user?.username !== userId
  ) {
    res.sendStatus(403);
  } else {
    // get old session data by id
    const existingPreviousSession: Session = await getExistingPreviousSession(
      user.user_id,
      sessionId
    );

    const existingPreviousSessionResponse: NewSessionResponse = {
      sessionObject: existingPreviousSession,
      needMoreQuestionsFlag: false,
    };

    // put current session in previous sessions
    // delete current session
    // put old session in current session
    const sessionResponse = await createNewSession(
      existingPreviousSessionResponse,
      user.user_id
    );

    // send back new Session
    res.send(sessionResponse.sessionObject).status(200);
  }
});

export default router;
