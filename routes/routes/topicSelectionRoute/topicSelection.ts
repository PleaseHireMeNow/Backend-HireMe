// Tools
import express from "express";
const router = express.Router();

// Dummy Data
import user from "../../../testing/db/user.json";
const selection = user[0].topic_selection;
// * ROUTES

router.get("/:userid", (req, res) => {
  //query the database to check if the user id is valid
  if (req.params.userid !== "string1") {
    res.sendStatus(403);
  }
  // Send status 200 and array of strings
  res.status(200).send(selection);
});

router.post("/:userid", (req, res) => {
  //query the database to check if the user id is valid
  if (req.params.userid !== "string1") {
    res.sendStatus(403);
  }
  // Send status 200 and array of strings
  res.sendStatus(200);
});

router.put("/:userid", (req, res) => {
  //query the database to check if the user id is valid
  if (req.params.userid !== "string1") {
    res.sendStatus(403);
  }
  // Send status 200 and array of strings
  res.sendStatus(200);
});

router.delete("/:userid", (req, res) => {
  //query the database to check if the user id is valid
  if (req.params.userid !== "string1") {
    res.sendStatus(403);
  }
  // Send status 200 and array of strings
  res.sendStatus(200);
});

export default router;
