// 내림차순 | 오름차순
type DirectionType = "ASC" | "DESC";

// 책 정렬 기준
export type BooksSortType = "PUBLISHED_AT" | "TITLE" | "QUIZ_COUNT";
// 리뷰 정렬 기준 (최신순, 별점 높은 순, 별점 낮은 순)
export type ReviewsSortType = "CREATED_AT" | "STAR_RATING";
// 스터디그룹 정렬 기준
export type StudyGroupsSortType = "CREATED_AT" | "JOINED_AT" | "NAME";
// 퀴즈 정렬 기준
export type QuizzesSortType = "STAR_RATING" | "CREATED_AT" | "UPDATED_AT";
// 내가 만든 퀴즈 정렬 기준
export type MyMadeQuizzesSortType = "CREATED_AT" | "UPDATED_AT" | "TITLE";

export interface FilterType<TSortType> {
  sort: TSortType;
  direction: DirectionType;
}

export interface BooksFilterType extends FilterType<BooksSortType> {}
export interface ReviewsFilterType extends FilterType<ReviewsSortType> {}
export interface StudyGroupsFilterType
  extends FilterType<StudyGroupsSortType> {}
export interface QuizzesFilterType extends FilterType<QuizzesSortType> {}
export interface MyMadeQuizzesFilterType
  extends FilterType<MyMadeQuizzesSortType> {}
