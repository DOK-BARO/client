export interface BookCategoryType {
  id: number;
  name: string;
  details?: BookCategoryType[];
}
