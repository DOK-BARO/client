export interface BookType {
  id: number;
  isbn: string;
  title: string;
  publisher: string;
  publishedAt: string;
  imageUrl: string;
  categories: BookCategoriesType[];
  authors: string[];
  quizCount?: number;
}

interface BookCategoriesType {
  id: string;
  name: string;
}

export interface BookQuizzesType {
  endPageNumber: number;
  data: BookQuizzesDataType[];
}

export interface BookQuizzesDataType {
  id: number;
  title: string;
  averageStarRating: number;
  averageDifficultyLevel: number;
  reviewCount: number;
  questionCount: number;
  creator: QuizCreatorType;
}

export interface QuizCreatorType {
  id: number;
  nickname: string;
  profileUrl: string;
}
