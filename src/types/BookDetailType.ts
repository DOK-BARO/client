export interface BookDetailType {
  id: number;
  isbn: string;
  title: string;
  publisher: string;
  publishedAt: string;
  price: number;
  description: string;
  imageUrl: string;
  categories: BookCategoriesType[];
  authors: string[];
}

export interface BookCategoriesType {
  id: string;
  name: string;
  parent: BookCategoriesType | null;
}
