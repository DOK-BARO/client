import { GetBooksParams, SearchBooksParams } from "@/types/BookType";

export const bookKeys = {
  detail: (id: string) => ["bookDetailContent", id] as const,
  categories: () => ["bookCategories"] as const,
  list: (param?: GetBooksParams) => ["bookList", param] as const,
  search: (params?: SearchBooksParams) => ["bookSearch", params] as const,
};

export const userKeys = {
  user: () => ["user"] as const,
};

export const quizKey = {
  myQuiz: () => ["myQuiz"] as const,
};
