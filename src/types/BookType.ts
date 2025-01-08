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

export interface BookQuizzesFilterType {
  sort: BookQuizzesSortType;
  direction: DirectionType;
}
export type BookQuizzesSortType = "CREATED_AT" | "STAR_RATING" | "TITLE"

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

export interface FetchQuizzesParams {
	page: string;
	size: string;
	bookId: string;
	sort: string;
	direction: string;
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
