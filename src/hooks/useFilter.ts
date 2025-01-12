import { useLocation } from "react-router-dom";
import { SetStateAction, useEffect } from "react";
import {
  BooksFilterType,
  MyMadeQuizzesFilterType,
  QuizzesFilterType,
  ReviewsFilterType,
  StudyGroupsFilterType,
} from "@/types/FilterType";

type FilterCriteria = {
  sort:
    | BooksFilterType["sort"]
    | ReviewsFilterType["sort"]
    | StudyGroupsFilterType["sort"]
    | QuizzesFilterType["sort"]
    | MyMadeQuizzesFilterType["sort"];
  direction:
    | BooksFilterType["direction"]
    | ReviewsFilterType["direction"]
    | StudyGroupsFilterType["direction"]
    | QuizzesFilterType["direction"]
    | MyMadeQuizzesFilterType["direction"];
};
const useFilter = <T extends FilterCriteria>(
  setFilterCriteria: (value: SetStateAction<T>) => void,
  resetFilter?: () => void
) => {
  // const [, setFilterCriteria] = useAtom(bookFilterAtom);
  const { search } = useLocation();

  // URL의 쿼리 파라미터와 동기화
  useEffect(() => {
    if (resetFilter && search == "") {
      resetFilter();
    }
    const queryParams = new URLSearchParams(search);
    const sort = queryParams.get("sort");
    const direction = queryParams.get("direction");

    setFilterCriteria((prev) => ({
      ...prev,
      sort: sort ? (sort as T["sort"]) : prev.sort,
      direction: direction ? (direction as T["direction"]) : prev.direction,
    }));
  }, [search, setFilterCriteria]);
};

export default useFilter;
