export interface BookType {
  id: number;
  isbn: string;
  title: string;
  publisher: string;
  publishedAt: string;
  imageUrl: string;
  categories: BookCategories[];
  authors: string[];
}

interface BookCategories {
  id: string;
  name: string;
}

// TODO: Params 타입은 따로 파일 분리하거나, 타입 지정하지 않고 그냥 service 로직 안에서 선언하기
// TODO: BookListFetchParams로 타입명 변경하기
export interface GetBookListParams {
  title?: string;
  authorName?: string;
  description?: string;
  category?: string;
  page?: number;
  size?: number;
  sort?: "PUBLISHED_AT" | "TITLE" | "QUIZ_COUNT";
  direction?: "ASC" | "DESC";
}
export interface SearchBookListParams {
  keyword?: string;
  lastId?: number;
  size?: number;
}
