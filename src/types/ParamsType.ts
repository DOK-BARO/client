import { BooksFilterType, ReviewsFilterType } from "./FilterType";

// BOOK
export interface FetchBooksParams {
	title?: string;
	authorName?: string;
	description?: string;
	category?: number;
	page?: number;
	size?: number;
	sort?: BooksFilterType["sort"];
	direction?: BooksFilterType["direction"];
}
export type FetchBooksKeyType = keyof FetchBooksParams;

export interface SearchBooksParams {
	keyword?: string;
	lastId?: number;
	size?: number;
}

// REVIEW
export interface FetchReviewsParams {
	quizId: number;
	page?: number;
	size?: number;
	sort?: ReviewsFilterType["sort"];
	direction?: ReviewsFilterType["direction"];
}

export interface NavigateReviewParams {
	solvingQuizId: string;
	quizTitle: string;
}

export interface CreateReviewParams {
	starRating: number,
	difficultyLevel: number,
	comment: string,
	quizId: number
}

// QUIZ
// TODO: 필드 타입 수정 필요
export interface FetchQuizzesParams {
	page: string;
	size: string;
	bookId: string;
	sort: string;
	direction: string;
}
