import express from "express";
import { admin, dbv2 } from "../../../modules/db";
import { validateUser } from "../../../modules/user.auth";
import { createNewUserData } from "./registerRoute.methods";
import { User } from "../../../types/models/models";

const router = express.Router();

router.get("/", validateUser, async (req, res) => {
  // double check that user exists
  if (!req.user) {
    return res.status(401).send("User not authenticated");
  }

  // ? other actions to perform for new user?
  // * verify new user by checking if they have user in the DB
  // check if uid exists in the DB, if not it's a new user
  const userRef = dbv2.collection("users").doc(req.user.uid);

  const userSnapshot = await userRef.get();

  // console.log("userSnapshot is : ", userSnapshot.exists);

  // if userData does not exist, create new user doc with user data
  if (!userSnapshot.exists) {
    console.log("This is a new user! Create a User in the DB");
    await createNewUserData(req.user);
  }

  // if userData exists or after it's created, grab userData from db
  // ? what's the return? all user data? populate the first questions set?
  // ? do we set the tech stack here? or later?
  const userData = await userRef.get();

  // ! Testing Admin SDK for the syntax below, returns user document
  // const questionData = await TestAdminSDKGetQuestions(req.user.uid);

  res.send(userData).status(200);
});

export default router;

// ! delete this, testing / Firebase Admin SDK syntax example
const TestAdminSDKGetQuestions = async (user_id: string) => {
  let topic = "JavaScript";
  let difficulty = "entry-level";

  const questionData = await dbv2
    .collection("questions")
    .doc(topic)
    .collection(difficulty)
    .get();
  // const questionData = await questionsRef.get();

  let listOfQuestions: any = [];

  if (questionData.empty) {
    console.log("No documents found in the collection.");
  } else {
    questionData.forEach(doc => {
      // console.log('Document ID:', doc.id, '\nData:', doc.data());
      listOfQuestions.push(doc.data());
    });
  }

  const userSnapshot = await dbv2.collection("users").doc(user_id).get();

  console.log(userSnapshot.data());

  return userSnapshot.data();
};
