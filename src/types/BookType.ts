export interface BookType {
  id: number;
  isbn: string;
  title: string;
  publisher: string;
  publishedAt: string;
  imageUrl: string;
  categories: BookCategories[];
  authors: string[];
  quizCount?: number;
}

interface BookCategories {
  id: string;
  name: string;
}

export type SortFilterType = "PUBLISHED_AT" | "TITLE" | "QUIZ_COUNT";

// TODO: Params 타입은 따로 파일 분리하거나, 타입 지정하지 않고 그냥 service 로직 안에서 선언하기
// TODO: BookListFetchParams로 타입명 변경하기
export interface GetBooksParams {
  title?: string;
  authorName?: string;
  description?: string;
  category?: number;
  page?: number;
  size?: number;
  sort?: SortFilterType;
  direction?: "ASC" | "DESC";
}

export type BookParamKeyType = keyof GetBooksParams;

export interface SearchBooksParams {
  keyword?: string;
  lastId?: number;
  size?: number;
}
