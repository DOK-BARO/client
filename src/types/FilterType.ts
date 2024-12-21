// 내림차순 | 오름차순
type DirectionType = "ASC" | "DESC";

// 책 정렬 기준
type BooksSortType = "PUBLISHED_AT" | "TITLE" | "QUIZ_COUNT";
// 리뷰 정렬 기준 (최신순, 별점 높은 순, 별점 낮은 순)
type ReviewsSortType = "CREATED_AT" | "STAR_RATING";
// 스터디그룹 정렬 기준
type StudyGroupsSortType = "CREATED_AT" | "TITLE";

export interface BooksFilterType {
  sort: BooksSortType;
  direction: DirectionType;
}

export interface ReviewsFilterType {
  sort: ReviewsSortType;
  direction: DirectionType;
}

export interface StudyGroupsFilterType {
  sort: StudyGroupsSortType;
  direction: DirectionType;
}
