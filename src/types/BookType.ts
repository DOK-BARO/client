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

export interface BooksFilterType {
  sort: BooksSortType;
  direction: DirectionType;
}
export type BooksSortType = "PUBLISHED_AT" | "TITLE" | "QUIZ_COUNT";
export type DirectionType = "ASC" | "DESC";

// TODO: Params 타입은 따로 파일 분리하거나, 타입 지정하지 않고 그냥 service 로직 안에서 선언하기
// TODO: BooksFetchParams로 타입명 변경하기
export interface BooksFetchParams {
  title?: string;
  authorName?: string;
  description?: string;
  category?: number;
  page?: number;
  size?: number;
  sort?: BooksSortType;
  direction?: DirectionType;
}

export type BookParamKeyType = keyof BooksFetchParams;

export interface SearchBooksParams {
  keyword?: string;
  lastId?: number;
  size?: number;
}
