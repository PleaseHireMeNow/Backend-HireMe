import { Timestamp } from "firebase/firestore";

export interface AnswerContent {
  text: string;
}

export interface Answer {
  answer_content: AnswerContent;
  is_correct: boolean;
}

export interface AnswerHistory {
  question_id: string;
  question_content: QuestionContent;
  answered_correctly: number;
  answered_incorrectly: number;
  responses: [
    {
      timestamp: Timestamp;
      response: {
        answer: Answer;
      };
      session_id: string;
    }
  ];
}

export interface Response {
  responseContent: {
    text: string;
  };
  isCorrect: boolean;
}

export interface QuestionContent {
  text: string;
  answers: Answer[];
}

export interface Question {
  question_id: string;
  question_content: QuestionContent;
  rating: number;
}

export interface CompletedQuestion extends Question {
  responses: Response[];
}

export interface User {
  user_id: string;
  username: string;
  topic_selection: [
    {
      topic: {
        name: string;
        iconPath: string;
      };
      difficulty: {
        name: string;
        iconPath: string;
      };
    }
  ];
  is_guest: boolean;
  history: AnswerHistory[];
}

export interface Session {
  current_question: number;
  answered_correctly: number;
  timestamp: Timestamp;
  questions: SessionQuestion[];
  session_id?: string;
}

export interface SessionQuestion {
  question: Question;
  answer?: Answer;
}

// export interface NewSessionResponse {
//   sessionQuestionList: Question[],
//   needMoreQuestionsFlag: boolean,
//   current_question: number
// }

export type Questions = Question[];
