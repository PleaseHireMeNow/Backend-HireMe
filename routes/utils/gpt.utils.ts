import { Question } from "../../types/models/models";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../modules/db";
import { getQuestionDocuments } from "./questionDocs.utils";
import { gptSendPrompt } from "../../modules/openai";

export const invokeGpt = async (
  topic: string,
  difficulty: string,
  numberOfQuestions: number
) => {
  console.log("GPT invoked!");
  // Get list of questions under topic->difficulty as REF for GPT prompt
  const allQuestions = await getQuestionDocuments(topic, difficulty);
  const allQuestionsContentText: string[] = [];

  // map questions text only
  allQuestions.map(question => {
    allQuestionsContentText.push(question.question_content.text);
  });

  // * GPT get question data!
  // ! SETUP YOUR OWN GPT ACCOUNT AND ADD YOUR KEY TO .env AS: "OPENAI_API_KEY"
  const result = await gptSendPrompt(
    topic,
    difficulty,
    allQuestionsContentText,
    numberOfQuestions
  );

  // grab response content and parse to JSON
  const gptResponse = result.choices[0].message.content;
  const gptResponseJson = JSON.parse(gptResponse || "");

  await setQuestionDoc(topic, difficulty, gptResponseJson.questions);
  console.log("GPT questions added!");
};

// * Send new questions to DB
const setQuestionDoc = async (
  topic: string,
  difficulty: string,
  questionArray: Question[]
) => {
  questionArray.forEach(async question => {
    try {
      const dataRef = doc(
        collection(doc(collection(db, "questions"), topic), difficulty)
      );

      question.question_id = dataRef.id;

      await setDoc(dataRef, question);
    } catch (error) {
      console.error("Error happened in setQuestionDoc", error);
    }
  });
};
