import "dotenv/config";
import OpenAI from "openai";
// import Configuration from "openai";
// import CreateChatCompletionRequest from "openai";
import  CreateChatCompletionRequestMessage from "openai/resources";
import questionFormat from "../types/gptJson/question-format.json";

const openai = new OpenAI();

// creating function to make call to  prompt
export const gptSendPrompt = async (
  topic: string,
  difficulty: string,
  priorQuestionsList: string[],
  responseQuantity: number
) => {
  // setup prompt message
  // const gptMessage = gptMessageConfig(
  //   topic,
  //   difficulty,
  //   priorQuestionsList,
  //   responseQuantity
  // );
  console.log('prompt sent!');
  

  // this is the call to Open AI
  const response = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
      You are an AI assistant, who primarily creates multiple choice questions for quizzes. 
  
      Take in input for a tech stack and a sample of questions and 
      generate sets of questions. 
  
      Each set of questions must be returned as multiple choice, with 4 potential answers.
      For each question more than one answer can be true.  
  
      Only generate questions relevant to the provided 'Tech Stack' and 'Target Audience'. 
  
      Questions answers can be verbose. 
  
      Take into account questions already in the database and generate new questions. 
    `,
      },
      {
        role: "user",
        content: `
        Return an array of ${responseQuantity} question objects as a JSON.
        Don't provide filler text.
  
        Formatting
        Questions should be returned as an array of question objects in a JSON format.
        The question object contains a "question_content" property.
        Inside "question_content" object should have properties of "text" and "answers".
        The "text" property should be a string that includes the question. 
        The "answers" property should be an array of objects.
        Each object in the "answers" array should have "answer_content" & "is_correct" properties.
        The "is_correct" property should be a boolean that indicates if the answer is true or false.
        The "answer_content" property is an object with a "text" property that contains the answer text in string form. 
  
        The JSON should look like this: ${questionFormat}
  
        Tech Stack: ${topic}
        Target Audience: ${difficulty}
        Questions in database: ${priorQuestionsList}
        
        `,
      },
    ],
    temperature: 0,
  });

  console.log('prompt Done!');
  
  // return the response
  return response;
};

// Prompt to send to GPT
const gptMessageConfig = (
  topic: string,
  difficulty: string,
  priorQuestionsList: string[],
  responseQuantity: number
) => {

  const gptMessage = [
    {
      role: "system",
      content: `
    You are an AI assistant, who primarily creates multiple choice questions for quizzes. 

    Take in input for a tech stack and a sample of questions and 
    generate sets of questions. 

    Each set of questions must be returned as multiple choice, with 4 potential answers.
    For each question more than one answer can be true.  

    Only generate questions relevant to the provided 'Tech Stack' and 'Target Audience'. 

    Questions answers can be verbose. 

    Take into account questions already in the database and generate new questions. 
  `,
    },
    {
      role: "user",
      content: `
      Return an array of ${responseQuantity} question objects as a JSON.
      Don't provide filler text.

      Formatting
      Questions should be returned as an array of question objects in a JSON format.
      The question object contains a "question_content" property.
      Inside "question_content" object should have properties of "text" and "answers".
      The "text" property should be a string that includes the question. 
      The "answers" property should be an array of objects.
      Each object in the "answers" array should have "answer_content" & "is_correct" properties.
      The "is_correct" property should be a boolean that indicates if the answer is true or false.
      The "answer_content" property is an object with a "text" property that contains the answer text in string form. 

      The JSON should look like this: ${questionFormat}

      Tech Stack: ${topic}
      Target Audience: ${difficulty}
      Questions in database: ${priorQuestionsList}
      
      `,
    },
  ];
  return gptMessage
};
