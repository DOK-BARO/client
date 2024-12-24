export type PagePositionType = "START" | "END" | "BETWEEN";
export type ParentComponentType = "BOOKS" | "MY" | "QUIZ" | `BOOK/${string}`;
export interface PaginationType {
  parentComponentType: ParentComponentType; // 페이지 타입: ex) 책 목록, 마이페이지
  currentPage: number;
  pagePosition: PagePositionType;
  totalPagesLength: number | undefined;
  middlePages: number[];
  middlePagesLength: number;
  isMiddlePagesUpdated: boolean;
}
