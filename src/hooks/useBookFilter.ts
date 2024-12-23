import { useLocation } from "react-router-dom";
import { SetStateAction, useEffect } from "react";
import { BooksFilterType, ReviewsFilterType } from "@/types/FilterType";

type FilterCriteria = {
  sort: BooksFilterType["sort"] | ReviewsFilterType["sort"];
  direction: BooksFilterType["direction"] | ReviewsFilterType["direction"];
};

// URL의 필터와 관련된 쿼리 파라미터(`sort`, `direction`)를 가져와,
// 제공된 필터 상태 업데이트 함수(setFilterCriteria)와 동기화하여
// 필터 상태를 유지 및 업데이트합니다.
const useFilter = <T extends FilterCriteria>(
  setFilterCriteria: (value: SetStateAction<T>) => void
) => {
  const { search } = useLocation();

  // URL의 쿼리 파라미터와 동기화
  useEffect(() => {
    const queryParams = new URLSearchParams(search);

    const sort = queryParams.get("sort");
    const direction = queryParams.get("direction");

    setFilterCriteria((prev) => ({
      ...prev,
      sort: sort ? (sort as BooksFilterType["sort"]) : prev.sort,
      direction: direction
        ? (direction as BooksFilterType["direction"])
        : prev.direction,
    }));
  }, [search, setFilterCriteria]);
};

export default useFilter;
