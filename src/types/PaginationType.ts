export type PagePositionType = "START" | "END" | "BETWEEN";
export type ParentPageType =
  | "books"
  | "quiz"
  | "book"
  | "my/made-quiz"
  | "my/solved-quiz";
export interface PaginationType {
  parentPage?: ParentPageType; // 페이지 타입: ex) 책 목록, 마이페이지
  currentPage: number;
  pagePosition: PagePositionType;
  totalPagesLength: number | undefined;
  middlePages: number[];
  middlePagesLength: number;
  isMiddlePagesUpdated: boolean;
}
