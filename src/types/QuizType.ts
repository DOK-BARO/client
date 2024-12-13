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

// 퀴즈 풀기 시 사용되는 타입
export interface SolvingQuizType {
	id: number;
	title: string;
	timeLimitSecond?: number;
	questions: SolvingQuizQuestionType[],
}

export interface SolvingQuizQuestionType {
	id: number;
	content:string;
	selectOptions: {content:string}[];
	type: RequestAnswerType;
}

export interface MyQuizType {
  id: number,
  bookImageUrl: string,
  title: string,
  updatedAt: string
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
	answerIndex: number;
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

export interface QuizRequestType { // TODO: 이름 아래와 통일 필요
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

export interface QuestionCheckedResult {
	solvingQuizId : number;
	playerId : number;
	quizId : number;
	questionId : number;
	correct : boolean;
	correctAnswer : string[];
	answerExplanationContent : string;
	answerExplanationImages : string[];
}