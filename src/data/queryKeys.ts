import { BooksFetchParams, SearchBooksParams } from "@/types/BookType";
import { ReviewsFetchParams } from "@/types/ReviewType";
import { FetchQuizzesParams } from "@/types/BookType";

export const bookKeys = {
  detail: (id: string) => ["bookDetailContent", id] as const,
  categories: () => ["bookCategories"] as const,
  list: (param?: BooksFetchParams) => ["bookList", param] as const,
  search: (params?: SearchBooksParams) => ["bookSearch", params] as const,
	quizList: (params: FetchQuizzesParams) => ["bookQuizList",params] as const,
};

export const studyGroupKeys = {
  detail: (id: number | undefined) => ["studyGroupDetail", id] as const,
  list: () => ["studyGroupList"] as const,
};

export const authKeys = {
  terms: () => ["terms"] as const,
  termDetail: (id: number | null) => ["termDetail", id] as const,
};

export const userKeys = {
  user: () => ["user"] as const,
};

export const quizKeys = {
  myQuiz: () => ["myQuiz"] as const,
  detail: (id: string | undefined) => ["quizDetail", id] as const,
  explanation: (id: string | undefined) => ["quizExplanation", id] as const,
};

export const reviewKeys = {
  totalScore: (id: number | undefined) => ["reviewTotalScore", id] as const,
  list: (param?: ReviewsFetchParams) => ["reviewList", param] as const,
};
