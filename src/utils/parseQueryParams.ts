import { FilterType } from "@/types/FilterType";

// T: ReviewsSortType | BooksSortType | StudyGroupsSortType
// type SortType = ReviewsSortType | BooksSortType | StudyGroupsSortType;
type ParseQueryParamsArgs = {
  category?: string;
  page?: string;
  size?: number;
  direction?: string;
  sort?: string;
};

export const parseQueryParams = <SortType>({
  category,
  page,
  size,
  direction,
  sort,
}: ParseQueryParamsArgs) => ({
  category: category ? Number(category) : undefined,
  page: page ? Number(page) : 1,
  size: size ?? undefined,
  direction: (direction as FilterType<SortType>["direction"]) ?? undefined,
  sort: (sort as FilterType<SortType>["sort"]) ?? undefined,
});
