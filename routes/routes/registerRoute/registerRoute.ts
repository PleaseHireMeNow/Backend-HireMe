import express from "express";
import { admin, dbv2 } from "../../../modules/db";
import { validateUser } from "../../../modules/user.auth";

const router = express.Router();

router.get("/", validateUser, async (req, res) => {
  const user_id = req.user.uid

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

  const userSnapshot = await dbv2
  .collection("users")
  .doc(user_id)
  .get();

  console.log(userSnapshot.data());
  

  res.send(userSnapshot.data()).status(200);
});

export default router;

// data from OAuth "social user"
/*
username: firstName
email: email
id: id
idToken: idToken
name: name
photoURL

*/
