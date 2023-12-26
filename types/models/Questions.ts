export interface AnswerContent {
  text: string;
}

export interface Answer {
  'answer_content': AnswerContent;
  'is_correct': boolean;
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
  'question_id': string;
  'question_content': QuestionContent;
  rating: number;
}

export interface CompletedQuestion extends Question {
  responses: Response[];
}

export interface User {
  username: string,
  topic_selection: [
    {
      topic: string,
      difficulty: string
    }
  ],
  is_guest: boolean,
  history: QuestionContent[],
  userAnswer: [
    {
      question_id: string,
      question_content: QuestionContent,
      response_content: Response,
      is_correct: boolean
    }
  ]

}


export type Questions = Question[];
