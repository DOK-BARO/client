import { FilterType } from "@/types/FilterType";

type ParseQueryParamsArgs = {
  category?: string;
  page?: string;
  size?: number;
  direction?: string;
  sort?: string;
  quizId?: number;
};

export const parseQueryParams = <SortType>({
  category,
  page,
  size,
  direction,
  sort,
  quizId,
}: ParseQueryParamsArgs) => {
  const params: { [key: string]: unknown } = {};
ㅊ