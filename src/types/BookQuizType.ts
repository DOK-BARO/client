import { ReactNode } from "react";
// TODO: 파일명 QuizType으로 변경

export interface QuizType {
  id: number;
  title: string;
  averageStarRating: number;
  averageDifficultyLevel: number;
  questionCount: number;
  creator: {
    // TODO: User타입이랑 연결시킬 수 있으면 연결하는게 좋을 것 같음
    id: number;
    nickname: string;
    profileUrl: string;
  };
}

// TODO: QuizCreationType으로 타입명 변경하기
export interface BookQuizType {
  title: string | null;
  description: string | null;
  bookId: number | null;
  timeLimitSecond?: string | null;
  viewScope: "EVERYONE" | "STUDY_GROUP" | "CREATOR" | null;
  editScope: "EVERYONE" | "STUDY_GROUP" | "CREATOR" | null;
  studyGroupId: number | undefined | null;
  questions: BookQuizQuestionType[] | null;
}

export interface BookQuizQuestionType {
  id: number;
  content: string;
  //TODO: api 요청 시 id제거 필요
  selectOptions: {id: number, option:string, value:string}[];
  answerExplanationContent: string;
  answerExplanationImages: File[],
  // answerExplanationImages: string[],
  answerType: "OX" | "FILL_BLANK" | "MULTIPLE_CHOICE" | "SHORT" | "CHECK_BOX";
  answers: string[];
}

// API 요청 시 사용할 타입
// TODO: 리팩토링 필요

export interface BookQuizRequestType {
  title: string;
  description: string;
  bookId: number;
  timeLimitSecond?: number;
  viewScope: "EVERYONE" | "STUDY_GROUP" | "CREATOR";
  editScope: "EVERYONE" | "STUDY_GROUP" | "CREATOR";
  studyGroupIds: number | undefined | null;
  questions: BookQuizQuestionRequestApiType[];
}

export type BookQuizQuestionRequestApiType = {
  content: string;
  selectOptions: string[]; // API용 타입
  answerExplanationContent: string;
  answerExplanationImages: string[];
  answerType: "OX" | "FILL_BLANK" | "MULTIPLE_CHOICE" | "SHORT"; // TODO: request시 CHECK_BOX는 MULTIPLE_CHOICE로 만들어야함
  answers: string[];
};

export interface QuizWriteFormItemType {
  id: number;
  quizWriteFormType: "OX" | "FILL_BLANK" | "MULTIPLE_CHOICE" | "SHORT" | "CHECK_BOX"; // TODO : 변수로 만들어야함
  component: ReactNode;
}