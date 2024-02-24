import { Timestamp } from "firebase/firestore";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

// extend "Request" type to include user as DecodedItToken
// global, no export needed
declare module "express-serve-static-core" {
  interface Request {
    user?: DecodedIdToken;
  }
}

// ! uncomment declare global & bottom braket to enable global types
// ! this would require going through routes that use the imports and removing all type imports
// ? declare global {
  
export interface Answer {
  answer_content: AnswerContent;
  is_correct: boolean;
}
export interface AnswerContent {
  text: string;
}

export interface AnswerHistory {
  question_id: string;
  question_content: QuestionContent;
  answered_correctly: number;
  answered_incorrectly: number;
  answers: [AnswerHistoryResponse];
}

export interface AnswerHistoryResponse {
  timestamp: Timestamp;
  answer: Answer;
  session_id: string;
}

export interface CompletedQuestion extends Question {
  responses: Response[];
}

export interface Difficulty {
  name: string;
  iconPath: string;
}

export interface NewSessionResponse {
  sessionObject: Session;
  needMoreQuestionsFlag: boolean;
}

export interface Question {
  question_id: string;
  question_content: QuestionContent;
  rating: number;
}

export interface QuestionContent {
  text: string;
  answers: Answer[];
}

export interface Response {
  responseContent: {
    text: string;
  };
  isCorrect: boolean;
}

export interface Session {
  session_id?: string;
  current_question: number;
  answered_correctly: number;
  timestamp: Timestamp;
  questions: SessionQuestion[];
  topic_selection: TopicSelection;
}

export interface SessionQuestion {
  question: Question;
  answer?: Answer;
}

export interface Topic {
  name: string;
  iconPath: string;
}

export interface TopicSelection {
  topic: Topic;
  difficulty: Difficulty;
}

export interface User {
  user_id: string;
  username: string;
  topic_selection: [TopicSelection];
  is_guest: boolean;
  session_history: Session[];
}

// ? }

// ? export {};
