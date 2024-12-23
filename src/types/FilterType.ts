// 내림차순 | 오름차순
type DirectionType = "ASC" | "DESC";

// 책 정렬 기준
export type BooksSortType = "PUBLISHED_AT" | "TITLE" | "QUIZ_COUNT";
// 리뷰 정렬 기준 (최신순, 별점 높은 순, 별점 낮은 순)
export type ReviewsSortType = "CREATED_AT" | "STAR_RATING";
// 스터디그룹 정렬 기준
export type StudyGroupsSortType = "CREATED_AT" | "TITLE";
export interface FilterType<TSortType> {
  sort: TSortType;
  direction: DirectionType;
}

export interface BooksFilterType extends FilterType<BooksSortType> {}
export interface ReviewsFilterType extends FilterType<ReviewsSortType> {}
export interface StudyGroupsFilterType
  extends FilterType<StudyGroupsSortType> {}
