import express from "express";
import {admin} from "../../../modules/db"
import {validateUser} from '../../../modules/user.auth'

const router = express.Router();

const db = admin.firestore(); 


router.get("/", validateUser, async (req, res) => {
  
  // const user = req.user.uid


  // let idToken =
  // "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlYzU4NjcwNGNhOTZiZDcwMzZiMmYwZDI4MGY5NDlmM2E5NzZkMzgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiR2FicmllbGxlIEdsYXNjbyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLLVF4bXcyZXVOTmRYcXBRV3BlMnp5a2RLUnFLY1JHY19OckpHc3V5Rk9FQWFVPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2hpcmVtZW5vdy1jODU0NiIsImF1ZCI6ImhpcmVtZW5vdy1jODU0NiIsImF1dGhfdGltZSI6MTcwODI5MTE3MywidXNlcl9pZCI6Imp1bkZNQmNJSlNPc1RPTWNsdDhkZ2lGRUNPaTEiLCJzdWIiOiJqdW5GTUJjSUpTT3NUT01jbHQ4ZGdpRkVDT2kxIiwiaWF0IjoxNzA4MjkxMTczLCJleHAiOjE3MDgyOTQ3NzMsImVtYWlsIjoiZ2FiZWdsYXNjb0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjEwODY2MDY2NDQ1NzI5OTMwNTUwNiJdLCJlbWFpbCI6WyJnYWJlZ2xhc2NvQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.CVR1wOXVlXmSIweLAfjJhizSKuw0MAby7I23rAVkqf2yYYIA_9x2maoDzlkiH-zFuQFHVgLUhQ2WdpLi1rBilGnb-bvDwDeK7UJRZLjujYuzSF2WBYeOcQFN0w_Wm3sa_rVO_ihFJsaMDfZKXnLjJhbkpi9-UmbwAe8hd_eZ_KbymPhWeIcyY-Ya6sqAiizCZEQIYyVtn_jsu6P54pvfMXsTUOVQloyz2ehNUJiWH9x8M_DOpo4-eRo7bubxAk1BV7MIIQzMKJuqDcBzCGd2W0jxWjtZlTpolhOe3nJyGPjuXn-r1pANTPF1qKmv6Kuh_iafhbQOUmMLQLAPavLkUg"
  // const decodedToken = await admin.auth().verifyIdToken(idToken);




let topic = "JavaScript"
let difficulty = "entry-level"

  const questionData = await db.collection("questions").doc(topic).collection(difficulty).get();
  // const questionData = await questionsRef.get();

let listOfQuestions: any = []

if (questionData.empty) {
  console.log('No documents found in the collection.');
} else {
  questionData.forEach((doc) => {
    // console.log('Document ID:', doc.id, '\nData:', doc.data());
    listOfQuestions.push(doc.data())
  });
}
console.log(req.user);

  // console.log(listOfQuestions[0]);
  

  res.send(req.user).status(200)


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
