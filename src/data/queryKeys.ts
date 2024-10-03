import { GetBookListParams } from "@/types/BookType";

export const bookKeys = {
  detail: (id: string) => ["bookDetailContent", id] as const,
  categories: () => ["bookCategories"] as const,
  list: (param?: GetBookListParams) => ["bookList", param] as const,
};

export const userKeys = {
  user: () => ["user"] as const,
};
