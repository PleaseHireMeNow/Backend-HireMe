import express from "express";
import {admin} from "../../../modules/db"
import {validateUser} from '../../../modules/user.auth'

const router = express.Router();

const db = admin.firestore(); 


router.get("/", async (req, res) => {
  
  // const user = req.user.uid


  // let idToken =
  //   "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJkYzRlMTA5ODE1ZjQ2OTQ2MGU2M2QzNGNkNjg0MjE1MTQ4ZDdiNTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NDc0ODA3NDU2NDQtanMwYjhqOXN0c3B1ODE0bGJ0Y3RlZ3NhOWppb2o3a3QuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NDc0ODA3NDU2NDQtanMwYjhqOXN0c3B1ODE0bGJ0Y3RlZ3NhOWppb2o3a3QuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDEyMDY1MzIyMzQ1NzYzNjQ5MTMiLCJlbWFpbCI6InBlZGVyLmdvb2RtYW5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTcwNzY4ODYwMCwibmFtZSI6IlBlZGVyIEdvb2RtYW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTEYwZmhBZmU2NTFmQU1BeG1hcWRpckxJTTgxd0VMbmxDVjhFTVI4OXpxWGpnPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlBlZGVyIiwiZmFtaWx5X25hbWUiOiJHb29kbWFuIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE3MDc2ODg5MDAsImV4cCI6MTcwNzY5MjUwMCwianRpIjoiMzcxZjkwNDJmMTcwMDE0NjZjMTY1YzVjMjNjMmIwZWVhMzNkMWY2NyJ9.M6oeUUYY6ABrntfJkiC_amKyeLtOdvOPKQmayLMIlLFrcPKHJP0Ijf94WFZNbdpBjpC5-GaArZTvpeeTgwPJtFtUJ447IrI8ILh0RMrG5BZwZW3Ve70_ropc0_m2ttWL5sRaOwWxvuCoIPuP37N2gIAQXWAOh2YRQDw_1GwnZs6_AsYSu1GyGw4ZeMU9WZ2a3sU_7ANaNvx_aCZLeZEz2e3I6b5ESftHdsVzcH6uokmoQqmbYs6O4w3fyGqy918wFkSTJqWUZ1BmOr0PJ4qMrjxajzpWC9JsW7AMvO64PYJYk_Yfwd02dlJhDND_Jrn-nAkUbZqKzdoaK6UEVpmjWA";
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

  console.log(listOfQuestions[0]);
  

  res.send(listOfQuestions).status(200)


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
