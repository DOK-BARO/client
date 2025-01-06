export type PagePositionType = "START" | "END" | "BETWEEN";
export type ParentPage = "books" | "quiz" | `book/${number}` | "my/made-quiz";
export interface PaginationType {
  parentPage?: ParentPage; // 페이지 타입: ex) 책 목록, 마이페이지
  currentPage: number;
  pagePosition: PagePositionType;
  totalPagesLength: number | undefined;
  middlePages: number[];
  middlePagesLength: number;
  isMiddlePagesUpdated: boolean;
}
