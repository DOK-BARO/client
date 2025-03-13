// 내림차순 | 오름차순
export type DirectionType = "ASC" | "DESC";

export type NavigateMode = "queryString" | "state";

// 정렬 기준 정의
export const SortOptions = {
  books: ["PUBLISHED_AT", "TITLE", "QUIZ_COUNT"] as const,
  reviews: ["CREATED_AT", "STAR_RATING"] as const,
  studyGroups: ["CREATED_AT", "JOINED_AT", "NAME"] as const,
  quizzes: ["STAR_RATING", "CREATED_AT", "UPDATED_AT"] as const,
  myMadeQuizzes: ["CREATED_AT", "UPDATED_AT", "TITLE"] as const,
  mySolvedQuizzes: ["TITLE", "CREATED_AT"] as const,
  myDraftQuizzes: ["TITLE", "CREATED_AT"] as const,
  myStudyUnSolvedQuizzes: ["TITLE", "CREATED_AT"] as const,
  myStudySolvedQuizzes: ["TITLE", "CREATED_AT"] as const,
} as const;

// 각 필터 타입 추출
export type BooksSortType = (typeof SortOptions.books)[number];
export type ReviewsSortType = (typeof SortOptions.reviews)[number];
export type StudyGroupsSortType = (typeof SortOptions.studyGroups)[number];
export type QuizzesSortType = (typeof SortOptions.quizzes)[number];
export type MyMadeQuizzesSortType = (typeof SortOptions.myMadeQuizzes)[number];
export type MySolvedQuizzesSortType =
  (typeof SortOptions.mySolvedQuizzes)[number];
// export type MyDraftQuizzesSortType =
//   (typeof SortOptions.myDraftQuizzes)[number];
export type MyStudyUnSolvedQuizzesSortType =
  (typeof SortOptions.myStudyUnSolvedQuizzes)[number];
export type MyStudySolvedQuizzesSortType =
  (typeof SortOptions.myStudySolvedQuizzes)[number];

// 필터 타입 (공통)
export interface FilterType<TSortType> {
  sort: TSortType;
  direction: DirectionType;
}

// 필터 타입 정의
export type BooksFilterType = FilterType<BooksSortType>;
export type ReviewsFilterType = FilterType<ReviewsSortType>;
export type StudyGroupsFilterType = FilterType<StudyGroupsSortType>;
export type QuizzesFilterType = FilterType<QuizzesSortType>;
export type MyMadeQuizzesFilterType = FilterType<MyMadeQuizzesSortType>;
export type MySolvedQuizzesFilterType = FilterType<MySolvedQuizzesSortType>;
// export type MyDraftQuizzesFilterType = FilterType<MyDraftQuizzesSortType>;
export type MyStudyUnSolvedQuizzesFilterType =
  FilterType<MyStudyUnSolvedQuizzesSortType>;
export type MyStudySolvedQuizzesFilterType =
  FilterType<MyStudySolvedQuizzesSortType>;

export type SupportedFilterTypes =
  | BooksFilterType
  | ReviewsFilterType
  | QuizzesFilterType
  | MyMadeQuizzesFilterType
  | StudyGroupsFilterType;
