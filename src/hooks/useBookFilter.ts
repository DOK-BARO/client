import { BooksFilterType, DirectionType } from "@/types/BookType";
import { useLocation } from "react-router-dom";
import { SetStateAction, useEffect } from "react";
import { ReviewsFilterType } from "@/types/ReviewType";

type FilterCriteria = {
  sort: BooksFilterType["sort"] | ReviewsFilterType["sort"];
  direction: DirectionType;
};
const useFilter = <T extends FilterCriteria>(
  setFilterCriteria: (value: SetStateAction<T>) => void
) => {
  // const [, setFilterCriteria] = useAtom(bookFilterAtom);
  const { search } = useLocation();

  // URL의 쿼리 파라미터와 동기화
  useEffect(() => {
    console.log("URL의 쿼리 파라미터와 동기화");
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
