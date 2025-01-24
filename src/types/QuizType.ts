import { ReactNode } from "react";
import { BookType } from "./BookType";
import { StudyGroupType } from "./StudyGroupType";
import { SolvingQuizStudyGroupUser } from "./UserType";
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

export interface QuizExplanationType {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  creator: {
    id: number;
    nickname: string;
    profileImageUrl: string;
  };
  book: {
    id: number;
    title: string;
    imageUrl: string;
  };
}

// 퀴즈 풀기 시 사용되는 타입
export interface SolvingQuizType {
  id: number;
  title: string;
  studyGroupId?: number;
  timeLimitSecond?: number;
  questions: SolvingQuizQuestionType[];
}

export interface SolvingQuizQuestionType {
  id: number;
  content: string;
  selectOptions: { content: string }[];
  type: AnswerType;
}

export interface MyQuizType {
  endPageNumber: number;
  data: MyQuizDataType[];
}

export interface MyQuizDataType {
  id: number;
  bookImageUrl?: string;
  title: string;
  updatedAt: string;
  studyGroup?: MyQuizStudyGroupType;
}

export interface MySolvedQuizType {
  endPageNumber: number;
  data: MySolvedQuizDataType[];
}

export interface MySolvedQuizDataType {
  id: number;
  bookImageUrl?: string;
  title: string;
  solvedAt: string;
  studyGroup?: MyQuizStudyGroupType;
  quiz: SolvedQuizType;
}

interface MyQuizStudyGroupType {
  id: number;
  name: string;
  profileImageUrl?: string;
}

interface SolvedQuizType {
  id: number;
  title: string;
}

export type ViewScope = "EVERYONE" | "STUDY_GROUP" | "CREATOR";
export type EditScope = "EVERYONE" | "STUDY_GROUP" | "CREATOR";
export const viewScopeTranslations: Record<ViewScope, string> = {
  EVERYONE: "모두",
  STUDY_GROUP: "스터디원만",
  CREATOR: "나만",
};
export const editScopeTranslations: Record<EditScope, string> = {
  EVERYONE: "모두",
  STUDY_GROUP: "스터디원만",
  CREATOR: "나만",
};

export type AnswerType =
  | "OX"
  | "FILL_BLANK"
  | "MULTIPLE_CHOICE_SINGLE_ANSWER"
  | "MULTIPLE_CHOICE_MULTIPLE_ANSWER"
  | "SHORT";

export interface QuizCreationType {
  title: string | null;
  description: string | null;
  book: BookType | null;
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

export interface QuizRequestType {
  // TODO: 이름 아래와 통일 필요
  id?: string;
  title: string;
  description: string;
  bookId: number;
  timeLimitSecond?: number;
  viewScope: ViewScope;
  editScope: EditScope;
  studyGroupId?: number | null;
  questions: QuizQuestionRequestApiType[];
}

export type QuizQuestionRequestApiType = {
  id?: number; // 수정하기 api 요청 시 id가 없으면 create, 있으면 modify
  content: string;
  selectOptions: string[];
  answerExplanationContent: string;
  answerExplanationImages: string[];
  answerType: AnswerType;
  answers: string[];
};

export interface QuestionFormType {
  id: number;
  answerType: AnswerType;
  component: ReactNode;
}

export interface QuestionCheckedResult {
  solvingQuizId: number;
  playerId: number;
  quizId: number;
  questionId: number;
  correct: boolean;
  correctAnswer: string[];
  answerExplanationContent: string;
  answerExplanationImages: string[];
}

export interface QuizSettingOptionType {
  label: string;
  description: string;
}

export interface QuizSettingType {
  title: string;
  name: string;
  options: QuizSettingOptionType[];
  icon: string; // path
}

export interface SolvingQuizGradeReuslt {
  solvingQuizId: number;
  quizId: number;
  playerId: number;
  questionCount: number;
  correctCount: number;
}

export interface SolvingQuizStudyGroupGradeReuslt {
  quizId: number;
  studyGroupId: number;
  totalQuestionCount: number;
  solvedMember: SolvedMember[];
  unSolvedMember: SolvingQuizStudyGroupUser[];
}

export interface SolvedMember {
  member: SolvingQuizStudyGroupUser;
  solvingQuizId: number;
  correctCount: number;
}
