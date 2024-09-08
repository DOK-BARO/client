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
}
