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

  if (category) {
    params.category = Number(category); // category가 있을 경우에만 추가
  }

  if (page) {
    params.page = Number(page);
  } else {
    params.page = 1; // 기본값 1
  }

  if (size) {
    params.size = size;
  }

  if (quizId !== undefined) {
    params.quizId = quizId;
  }

  if (direction) {
    params.direction = direction as FilterType<SortType>["direction"];
  }

  if (sort) {
    params.sort = sort as FilterType<SortType>["sort"];
  }

  return params;
};
