import { GetBookListParams, SearchBookListParams } from "@/types/BookType";

export const bookKeys = {
  detail: (id: string) => ["bookDetailContent", id] as const,
  categories: () => ["bookCategories"] as const,
  list: (param?: GetBookListParams) => ["bookList", param] as const,
  search: (params?: SearchBookListParams) => ["bookSearch", params] as const,
};

export const userKeys = {
  user: () => ["user"] as const,
};
