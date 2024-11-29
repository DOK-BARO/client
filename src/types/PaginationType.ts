export type PagePositionType = "start" | "end" | undefined;

export interface PaginationType {
  currentPage: number;
  pagePosition: PagePositionType;
  totalPagesLength: number | undefined;
  middlePages: number[];
  middlePagesLength: number;
}
