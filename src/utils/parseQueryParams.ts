import { FilterType } from "@/types/FilterType";

type ParseQueryParamsArgs = {
  category?: string;
  page?: string;
  size?: number;
  direction?: string;
  sort?: string;
  quizId?: number;
};

export const parseQueryParams = <SortType, ReturnParams>({
  category,
  page,
  size,
  direction,
  sort,
  quizId,
}: ParseQueryParamsArgs): ReturnParams => {
  const params: Record<string, unknown> = {};

  params["page"] = page ? Number(page) : 1; // 기본값 1 페이지

  if (category) {
    params["category"] = Number(category);
  }

  if (size) {
    params["size"] = size;
  }

  if (quizId !== undefined) {
    params["quizId"] = quizId;
  }

  if (direction) {
    params["direction"] = direction as FilterType<SortType>["direction"];
  }

  if (sort) {
    params["sort"] = sort as FilterType<SortType>["sort"];
  }

  return params as unknown as ReturnParams;
};
