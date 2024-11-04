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
