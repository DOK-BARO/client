import {
  BooksFilterType,
  ReviewsFilterType,
  StudyGroupsFilterType,
} from "./FilterType";

// BOOK
export interface BooksFetchType {
  title?: string;
  authorName?: string;
  description?: string;
  category?: number;
  page?: number;
  size?: number;
  sort?: BooksFilterType["sort"];
  direction?: BooksFilterType["direction"];
}
export type BooksFetchKeyType = keyof BooksFetchType;

export interface BooksSearchType {
  keyword?: string;
  lastId?: number;
  size?: number;
}

// REVIEW
export interface ReviewsFetchType {
  quizId: number;
  page?: number;
  size?: number;
  sort?: ReviewsFilterType["sort"];
  direction?: ReviewsFilterType["direction"];
}

export interface ReviewNavigateType {
  solvingQuizId: string;
  quizTitle: string;
}

// QUIZ
// TODO: 필드 타입 수정 필요
export interface QuizzesFetchType {
  page: string;
  size: string;
  bookId: string;
  sort: string;
  direction: string;
}

// 내가 만든 퀴즈, 내가 푼 퀴즈
export interface MyQuizzesFetchType {
  page: string;
  size?: string;
  sort?: string;
  direction?: string;
}

// STUDY GROUP
export interface StudyGroupsFetchType {
  page?: number;
  size?: number;
  sort?: StudyGroupsFilterType["sort"];
  direction?: StudyGroupsFilterType["direction"];
}

// Auth

export interface UserUpdateType {
  nickname?: string;
  email?: string;
  profileImage?: string | null;
}

// ROUTES

export interface QuizResultRouteType {
  quizId: number;
  solvingQuizId: number;
  quizTitle: string;
  studyGroupId?: string;
}

export interface QuizReviewRouteType {
  quizId: number;
  solvingQuizId: number;
  quizTitle: string;
}
