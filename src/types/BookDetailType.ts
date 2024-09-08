export interface BookDetailType {
  id: number;
  isbn: string;
  title: string;
  publisher: string;
  publishedAt: string;
  price: number,
  description: string;
  imageUrl: string;
  categories: BookCategories[];
  authors: string[];
}

interface BookCategories {
  id: string;
  name: string;
}
