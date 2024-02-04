import express, { Request, Response } from "express";
import userJson from "../../../testing/db/user.json";
import { getMatchingUser } from "../../utils/users.utils";
const router = express.Router();
import { getUserDocument } from "./userRoute.methods";

router.get("/:userid", async (req: Request, res: Response) => {
  const user = await getMatchingUser(req.params.userid);
  if (user) {
    const userDoc = await getUserDocument(user.user_id);
    res.send(userDoc).status(200);
  } else {
    res.sendStatus(403);
  }
});

router.post("/", (req: Request, res: Response) => {
  //receive oauth token
  const oAuthToken = req.body.idToken;
  const redirectUri = req.body.redirectUri;
  console.log("oAuthToken", oAuthToken, "redirectUri", redirectUri)
  // //token validation
  // tokenValidationMethodFail() && res.send(400)
  // //token validation flow with google
  const oAuthResults = tokenValidationWithGoogle(oAuthToken, redirectUri);
  console.log("oAuthResults", oAuthResults)
  // //get user from database
  // const databaseUser = getUserFromDatabase(oAuthResults.idToken)
  // //update user in database
  // updateUserInDatabase(databaseUser, oAuthResults.user)
  // //send response
  // res.send(200);  
  
  // if (userJson[0].user_id === req.params.userid) {
  //   res.sendStatus(200);
  // } else {
  //   res.sendStatus(403);
  // }
});

router.delete("/:userid", (req: Request, res: Response) => {
  if (userJson[0].user_id === req.params.userid) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

export default router;
