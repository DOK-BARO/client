import { ReactNode } from "react";
import { BookType } from "./BookType";
import { StudyGroupType } from "./StudyGroupType";
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

export type ViewScope = "EVERYONE" | "STUDY_GROUP" | "CREATOR";
export type EditScope = "EVERYONE" | "STUDY_GROUP" | "CREATOR";
export const scopeTranslations: Record<ViewScope, string> = {
  EVERYONE: "모두",
  STUDY_GROUP: "스터디원만",
  CREATOR: "나만",
};

export type AnswerType =
  | "OX"
  | "FILL_BLANK"
  | "MULTIPLE_CHOICE"
  | "SHORT"
  | "CHECK_BOX";
export type RequestAnswerType =
  | "OX"
  | "FILL_BLANK"
  | "MULTIPLE_CHOICE"
  | "SHORT";

export interface QuizCreationType {
  title: string | null;
  description: string | null;
  book: BookType | null;
  timeLimitSecond?: string | null;
  viewScope: ViewScope | null;
  editScope: EditScope | null;
  studyGroup: StudyGroupType | null | undefined; // undefined -> 스터디그룹 선택 안함
  questions: QuizQuestionType[] | null;
}

export interface SelectOptionType {
  id: number;
  option: string;
  value: string;
}

export interface QuizQuestionType {
  id: number;
  content: string;
  selectOptions: SelectOptionType[];
  answerExplanationContent: string;
  answerExplanationImages: File[];
  answerType: AnswerType;
  answers: string[];
}

export interface QuizRequestType {
  title: string;
  description: string;
  bookId: number;
  timeLimitSecond?: number;
  viewScope: ViewScope;
  editScope: EditScope;
  studyGroupIds?: number | null;
  questions: QuizQuestionRequestApiType[];
}

export type QuizQuestionRequestApiType = {
  content: string;
  selectOptions: string[];
  answerExplanationContent: string;
  answerExplanationImages: string[];
  answerType: RequestAnswerType;
  answers: string[];
};

export interface QuestionFormType {
  id: number;
  answerType: AnswerType;
  component: ReactNode;
}
